import type { SvgIconsEnum } from '@/common/svgIcons'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'empty' | '404'
    title?: string
    icon?: SvgIconsEnum
    isMenuitem?: boolean
    menuitemOrder?: number
  }
}
