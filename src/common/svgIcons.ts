// @ts-ignore
// @ts-nocheck

import { Component } from 'vue'
import IMenuHome from '~icons/menu/home'
import IMenuChart from '~icons/menu/chart'
import IMenuCustomer from '~icons/menu/customer'
import IMenuSetting from '~icons/menu/setting'
import IMenuCode from '~icons/menu/code'
import IMenuMd from '~icons/menu/md'
import IMenuError from '~icons/menu/error'

const svgIcons = [
  {
    name: 'i-menu-home',
    icon: IMenuHome as Component
  },
  {
    name: 'i-menu-customer',
    icon: IMenuCustomer as Component
  },
  {
    name: 'i-menu-chart',
    icon: IMenuChart as Component
  },
  {
    name: 'i-menu-setting',
    icon: IMenuSetting as Component
  },
  {
    name: 'i-menu-code',
    icon: IMenuCode as Component
  },
  {
    name: 'i-menu-md',
    icon: IMenuMd as Component
  },
  {
    name: 'i-menu-error',
    icon: IMenuError as Component
  }
] as const

export const svgIconsMap = svgIcons.reduce((map, { name, icon }) => {
  map.set(name, icon)
  return map
}, new Map())

export type SvgIconsEnum = (typeof svgIcons)[number]['name']
