import router from '.'
import { useConfigStore, useCancelRequestStore } from '../stores'

const allowPath = ['/login']

// 路由守卫
router.beforeEach((to, _from, next) => {
  const configStore = useConfigStore()
  const cancelRequestStore = useCancelRequestStore()

  if (allowPath.includes(to.path)) return next()
  // 获取token
  const token = sessionStorage.getItem('token')
  // 手动判断token是否存在且有效
  if (!token) return next('/login')
  // 保存路由路径
  configStore.setCurrentPath(to.path)
  // 清除上一个页面未完成的请求
  cancelRequestStore.clear()
  next()
})
