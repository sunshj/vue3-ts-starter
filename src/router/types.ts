import type { IconsEnum } from '@/common/icons-helper'
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'empty' | '404'
    /** 菜单标题 */
    title?: string
    /** 菜单显示图标 */
    icon?: IconsEnum
    /** 是否为菜单栏 */
    isMenuitem?: boolean
    /** 菜单项排序 */
    menuitemOrder?: number
    /** 面包屑是否link */
    isLink?: boolean
  }
}
