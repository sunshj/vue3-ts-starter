declare global {
  interface Window {
    readonly __RUNTIME_ENV__: RuntimeConfig
  }
}

interface RuntimeConfig {
  // Auto-generated by runtime-config 
  readonly gitCommit: string
  readonly gitBranch: string
  readonly gitCommitDate: string
  readonly gitCommitMessage: string
}

export {}