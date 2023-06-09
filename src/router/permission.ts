import router from '.'
import { useActivePathStore } from '../stores/active-path'
import { useCancelRequestStore } from '../stores/cancel-request'

// 路由守卫
router.beforeEach((to, _from, next) => {
  const activePathStore = useActivePathStore()
  const cancelRequestStore = useCancelRequestStore()

  if (to.path === '/login') return next()
  // 获取token
  const token = sessionStorage.getItem('token')
  // 手动判断token是否存在且有效
  if (!token) return next('/login')
  // 保存路由路径
  activePathStore.update(to.path)
  // 清除上一个页面未完成的请求
  cancelRequestStore.clear()
  next()
})
