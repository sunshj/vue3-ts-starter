/// <reference types="vite/client" />
import 'vue-router'

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_UPLOAD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'monaco-editor-vue3'
declare interface Window {
  MonacoEnvironment: any
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
  }
}
