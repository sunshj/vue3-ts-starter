import { useCancelRequestStore, useConfigStore } from '../stores'
import router from '.'

const allowPath = ['/login']

// 路由守卫
router.beforeEach((to, _from, next) => {
  const configStore = useConfigStore()
  const cancelRequestStore = useCancelRequestStore()

  // 获取token
  const token = sessionStorage.getItem('token')
  // 手动判断token是否存在且有效
  if (!token) {
    if (allowPath.includes(to.path)) return next()
    return next('/login')
  }
  if (to.path === '/login') return next('/')
  // 保存路由路径
  configStore.setCurrentPath(to.path)
  // 清除上一个页面未完成的请求
  cancelRequestStore.clear()
  next()
})
