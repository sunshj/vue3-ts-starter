import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Login = () => import('@/views/Login.vue')
const Charts = () => import('@/views/Charts/index.vue')
const Users = () => import('@/views/User/index.vue')
const UserProfile = () => import('@/views/User/Profile.vue')
const EditorTool = () => import('@/views/Tool/Editor.vue')
const MarkdownTool = () => import('@/views/Tool/Markdown.vue')
const ErrorTool = () => import('@/views/Tool/Error.vue')

export const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home,
        meta: {
          title: '首页',
          icon: 'icon-shouye'
        }
      },
      {
        path: '/users',
        component: Users,
        meta: {
          title: '用户管理',
          icon: 'icon-kehuguanli'
        }
      },
      {
        path: '/charts',
        component: Charts,
        meta: {
          title: '图表统计',
          icon: 'icon-shujuzhongxin'
        }
      },
      {
        path: '/profile',
        component: UserProfile,
        hidden: true
      },
      {
        path: '/tool',
        redirect: '/tool/editor',
        meta: {
          title: '系统工具',
          icon: 'icon-guanli'
        },
        children: [
          {
            path: 'editor',
            component: EditorTool,
            meta: {
              title: '代码编辑',
              icon: 'icon-code'
            }
          },
          {
            path: 'markdown',
            component: MarkdownTool,
            meta: {
              title: 'Markdown',
              icon: 'icon-shijianmoban'
            }
          },
          {
            path: 'error',
            component: ErrorTool,
            meta: {
              title: '错误日志',
              icon: 'icon-error'
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
