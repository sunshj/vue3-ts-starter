import type { MessageSchema } from '@/i18n'
import type { SvgIcon } from 'virtual:icons-helper'
import type { PickupPaths } from 'vue-i18n'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: 'default' | 'empty' | '404'
    /** 菜单标题 */
    title?: PickupPaths<MessageSchema>
    /** 菜单显示图标 */
    icon?: SvgIcon
    /** 是否为菜单栏 */
    isMenuitem?: boolean
    /** 菜单项排序 */
    menuitemOrder?: number
    /** 面包屑是否link */
    isLink?: boolean
  }
}
