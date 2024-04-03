import { execSync } from 'node:child_process'
import type { HtmlTagDescriptor, Plugin } from 'vite'

interface Command {
  command: string
  key: string
}

export interface GitInfoOptions {
  commands?: Command[]
  /** @default true */
  injectToHead?: boolean
  globalDefine?: {
    /** @default true */
    enable?: boolean
    /** @default '__GIT_INFO__' */
    key?: string
  }

  enableVars?: {
    /** @default true */
    shortCommitHash?: boolean
    /** @default false */
    lastCommitTime?: boolean
    /** @default false */
    lastCommitMsg?: boolean
  }
}

const defaultOptions = {
  globalDefine: {
    enable: true,
    key: '__GIT_INFO__'
  },
  injectToHead: true,
  enableVars: {
    shortCommitHash: true,
    lastCommitMsg: false,
    lastCommitTime: false
  }
} satisfies GitInfoOptions

async function execCommands(commands: Command[]) {
  if (!Array.isArray(commands)) return Promise.resolve([])

  const results = await Promise.allSettled<{ stdout: string } & Command>(
    commands.map(item => {
      return new Promise(resolve => {
        const stdout = execSync(item.command).toString()
        resolve({ stdout, ...item })
      })
    })
  )

  return results.map(res => (res.status === 'fulfilled' ? res.value : undefined))
}

const generateDefaultCommands = (options?: GitInfoOptions) => {
  const defaultCommands: Command[] = []
  const shortCommitHash =
    options?.enableVars?.shortCommitHash ?? defaultOptions.enableVars.shortCommitHash
  const lastCommitTime =
    options?.enableVars?.lastCommitTime ?? defaultOptions.enableVars.lastCommitTime
  const lastCommitMsg =
    options?.enableVars?.lastCommitMsg ?? defaultOptions.enableVars.lastCommitMsg

  if (shortCommitHash)
    defaultCommands.push({
      key: 'commit',
      command: 'git rev-parse --short HEAD'
    })

  if (lastCommitTime)
    defaultCommands.push({
      key: 'time',
      command: 'git log -1 --format=%cI'
    })

  if (lastCommitMsg)
    defaultCommands.push({
      key: 'msg',
      command: 'git log -1 --format=%s'
    })

  return defaultCommands
}

async function generateGitInfoData(options?: GitInfoOptions) {
  const commands = Array.isArray(options?.commands)
    ? [...generateDefaultCommands(options), ...options.commands]
    : generateDefaultCommands(options)

  const res = await execCommands(commands)

  return res.reduce(
    (acc, item) => ({ ...acc!, [item!.key]: item!.stdout.replaceAll(/\r|\n/gi, '') }),
    {} as Record<string, string>
  )
}

async function vitePluginGitInfo(options?: GitInfoOptions): Promise<Plugin> {
  const info = await generateGitInfoData(options)

  return {
    name: 'vite-plugin-git-info',
    apply: 'build',
    config() {
      const enable = options?.globalDefine?.enable ?? defaultOptions.globalDefine?.enable
      const key = options?.globalDefine?.key ?? defaultOptions.globalDefine?.key
      return {
        define: { ...(enable ? { [key]: JSON.stringify(info) } : {}) }
      }
    },
    transformIndexHtml(html) {
      const tags: HtmlTagDescriptor[] = []
      const injectToHead = options?.injectToHead ?? defaultOptions.injectToHead
      if (injectToHead) {
        tags.push({
          tag: 'meta',
          attrs: info,
          injectTo: 'head-prepend'
        })
      }

      return {
        html,
        tags
      }
    }
  }
}

export { vitePluginGitInfo as GitInfo }
