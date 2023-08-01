import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Login = () => import('@/views/Login.vue')
const Charts = () => import('@/views/Charts/index.vue')
const Users = () => import('@/views/User/index.vue')
const UserProfile = () => import('@/views/User/Profile.vue')
const EditorTool = () => import('@/views/Tool/Editor.vue')
const MarkdownTool = () => import('@/views/Tool/Markdown.vue')
const ErrorTool = () => import('@/views/Tool/Error.vue')

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'i-menu-home'
        }
      },
      {
        path: '/users',
        component: Users,
        meta: {
          title: '用户管理',
          icon: 'i-menu-customer'
        }
      },
      {
        path: '/charts',
        component: Charts,
        meta: {
          title: '图表统计',
          icon: 'i-menu-chart'
        }
      },
      {
        path: '/profile',
        component: UserProfile,
        meta: {
          hidden: true
        }
      },
      {
        path: '/tool',
        redirect: '/tool/editor',
        meta: {
          title: '系统工具',
          icon: 'i-menu-setting'
        },
        children: [
          {
            path: 'editor',
            component: EditorTool,
            meta: {
              title: '代码编辑',
              icon: 'i-menu-code'
            }
          },
          {
            path: 'markdown',
            component: MarkdownTool,
            meta: {
              title: 'Markdown',
              icon: 'i-menu-md'
            }
          },
          {
            path: 'error',
            component: ErrorTool,
            meta: {
              title: '错误日志',
              icon: 'i-menu-error'
            }
          }
        ]
      }
    ]
  },
  { path: '/login', component: Login },
  {
    path: '/:any*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
