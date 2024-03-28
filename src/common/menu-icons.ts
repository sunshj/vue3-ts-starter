// @ts-expect-error
// @ts-nocheck

import type { Component } from 'vue'

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
