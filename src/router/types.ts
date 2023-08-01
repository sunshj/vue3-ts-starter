import type { SvgIconsEnum } from '@/common/svgIcons'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: SvgIconsEnum
    hidden?: boolean
  }
}
