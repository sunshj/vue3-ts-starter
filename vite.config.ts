import { fileURLToPath, URL } from 'node:url'
import { EnvDts, GitInfo, IconsHelper } from '@sunshj/vite-plugins'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    VueRouter({
      exclude: ['**/components/**.vue'],
      dts: 'types/router.d.ts',
      importMode(filepath) {
        const lazyLoadPages = ['/login.vue', '/index.vue', '/charts.vue']
        if (lazyLoadPages.includes(filepath.split('src/pages')[1])) return 'async'
        return 'sync'
      }
    }),
    vue(),
    Layouts(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        'svg-icon': FileSystemIconLoader('./src/assets/svgIcons')
      },
      defaultStyle: 'width:20px;height:20px;'
    }),
    AutoImport({
      dts: 'types/imports.d.ts',
      imports: [
        'vue',
        VueRouterAutoImports,
        { 'vue-router/auto': ['useLink'] },
        '@vueuse/core',
        'pinia'
      ],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'svg',
          customCollections: ['svg-icon'],
          alias: {
            icon: 'svg-icon'
          }
        })
      ],
      dirs: ['./src/stores', './src/composables']
    }),
    Components({
      dts: 'types/components.d.ts',
      directoryAsNamespace: true,
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'svg',
          customCollections: ['svg-icon'],
          alias: {
            icon: 'svg-icon'
          }
        }),
        {
          type: 'directive',
          resolve(name) {
            return {
              name: `v${name}`,
              from: '@/directives/index.ts'
            }
          }
        }
      ]
    }),
    GitInfo({
      commands: [
        {
          key: 'fullHash',
          command: 'git rev-parse HEAD'
        }
      ],
      usingKeys: {
        shortHash: false
      },
      injectToHead: false
    }),
    EnvDts({
      dtsFile: 'types/env.d.ts'
    }),
    IconsHelper({
      preserveImports: false
    })
  ],
  optimizeDeps: {
    include: [
      'monaco-editor/esm/vs/editor/editor.worker',
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker'
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  esbuild: {
    pure: mode === 'production' ? ['console.log'] : []
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/monaco-editor')) return 'monaco-editor'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}))
