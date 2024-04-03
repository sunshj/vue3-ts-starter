import { execSync } from 'node:child_process'
import type { HtmlTagDescriptor, Plugin } from 'vite'

interface Command<T> {
  command: string
  key: T
}

export interface GitInfoOptions<TCmd extends string | number | symbol> {
  commands?: Command<TCmd>[]
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
    shortHash?: boolean
    /** @default false */
    time?: boolean
    /** @default false */
    msg?: boolean
  } & { [k in TCmd]?: boolean }
}

const defaultOptions = {
  globalDefine: {
    enable: true,
    key: '__GIT_INFO__'
  },
  injectToHead: true,
  enableVars: {
    shortHash: true,
    time: false,
    msg: false
  },
  commands: [
    { key: 'shortHash', command: 'git rev-parse --short HEAD' },
    {
      key: 'time',
      command: 'git log -1 --format=%cI'
    },
    {
      key: 'msg',
      command: 'git log -1 --format=%s'
    }
  ]
} satisfies GitInfoOptions<string>

async function execCommands<TCmd extends string | number | symbol>(commands: Command<TCmd>[]) {
  if (!Array.isArray(commands)) return Promise.resolve([])

  const results = await Promise.allSettled<{ stdout: string } & Command<TCmd>>(
    commands.map(item => {
      return new Promise(resolve => {
        const stdout = execSync(item.command).toString()
        resolve({ stdout, ...item })
      })
    })
  )

  return results.map(res => (res.status === 'fulfilled' ? res.value : undefined))
}

const generateCommands = <TCmd extends string | number | symbol>(
  options: GitInfoOptions<TCmd>,
  commands: Command<TCmd>[]
) => {
  return Object.entries({ ...defaultOptions.enableVars, ...options.enableVars }).reduce(
    (acc, [key, value]) => {
      if (value) {
        return [...acc, ...commands.filter(v => v.key === key)]
      }
      return []
    },
    []
  )
}

async function generateGitInfoData<TCmd extends string | number | symbol>(
  options?: GitInfoOptions<TCmd>
) {
  const commands = Array.isArray(options?.commands)
    ? [
        ...generateCommands<TCmd>(options, defaultOptions.commands as Command<TCmd>[]),
        ...generateCommands<TCmd>(options, options.commands)
      ]
    : generateCommands<TCmd>(options, defaultOptions.commands as Command<TCmd>[])

  const res = await execCommands<TCmd>(commands as Command<TCmd>[])

  return res.reduce(
    (acc, item) => ({ ...acc!, [item!.key]: item!.stdout.replaceAll(/\r|\n/gi, '') }),
    {} as Record<string, string>
  )
}

async function vitePluginGitInfo<TCmd extends string | number | symbol>(
  options?: GitInfoOptions<TCmd>
): Promise<Plugin> {
  const info = await generateGitInfoData<TCmd>(options)

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
