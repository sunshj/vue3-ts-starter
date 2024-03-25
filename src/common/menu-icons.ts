// @ts-expect-error
// @ts-nocheck

import type { Component } from 'vue'
import SvgIconHome from '~icons/svg-icon/home'
import SvgIconChart from '~icons/svg-icon/chart'
import SvgIconCustomer from '~icons/svg-icon/customer'
import SvgIconSetting from '~icons/svg-icon/setting'
import SvgIconCode from '~icons/svg-icon/code'
import SvgIconMd from '~icons/svg-icon/md'
import SvgIconError from '~icons/svg-icon/error'

const menuIcons = [
  {
    name: 'home',
    icon: SvgIconHome as Component
  },
  {
    name: 'customer',
    icon: SvgIconCustomer as Component
  },
  {
    name: 'chart',
    icon: SvgIconChart as Component
  },
  {
    name: 'setting',
    icon: SvgIconSetting as Component
  },
  {
    name: 'code',
    icon: SvgIconCode as Component
  },
  {
    name: 'md',
    icon: SvgIconMd as Component
  },
  {
    name: 'error',
    icon: SvgIconError as Component
  }
] as const

export const menuIconsMap = menuIcons.reduce((map, { name, icon }) => {
  map.set(name, icon)
  return map
}, new Map<string, Component>())

export type MenuIconsEnum = (typeof menuIcons)[number]['name']
