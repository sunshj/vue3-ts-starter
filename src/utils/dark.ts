import { enable, disable } from 'darkreader'

export const enableDark = () => enable({ brightness: 105, contrast: 95, sepia: 0, grayscale: 15 })

export const disableDark = () => disable()
