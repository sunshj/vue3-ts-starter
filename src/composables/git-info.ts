interface GitInfo {
  msg: string
  time: string
  shortHash: string
}

declare global {
  const __GIT_INFO__: GitInfo
  interface Window {
    __GIT_INFO__: GitInfo
  }
}

export function useGitInfo() {
  const gitInfo = __GIT_INFO__

  window.__GIT_INFO__ = __GIT_INFO__

  return gitInfo
}
