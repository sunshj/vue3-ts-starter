/* eslint-disable no-param-reassign */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Layouts from 'vite-plugin-vue-meta-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      exclude: ['**/components/**.vue'],
      routeBlockLang: 'yaml'
    }),
    vue(),
    Layouts(),
    AutoImport({
      imports: ['vue', VueRouterAutoImports, { 'vue-router/auto': ['useLink'] }, '@vueuse/core'],
      dts: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          customCollections: ['menu']
        })
      ]
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        menu: FileSystemIconLoader('./src/assets/icons/svg')
      },
      iconCustomizer(collection, _icon, props) {
        if (collection === 'menu') {
          props.width = '20px'
          props.height = '20px'
        }
        if (collection === 'fa6-brands') {
          props.width = '1.5em'
          props.height = '1.5em'
        }
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
