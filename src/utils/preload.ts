import type { RouteLocationRaw, Router } from 'vue-router'

export async function preloadRouteComponents(
  to: RouteLocationRaw,
  router: Router & {
    _routePreloaded?: Set<string>
    _preloadPromises?: Array<Promise<unknown>>
  }
): Promise<void> {
  const { path, matched } = router.resolve(to)
  if (!matched.length) return

  router._routePreloaded ??= new Set()
  if (router._routePreloaded.has(path)) return

  const promises = (router._preloadPromises = router._preloadPromises || [])

  if (promises.length > 4) {
    return Promise.all(promises).then(() => preloadRouteComponents(to, router))
  }

  router._routePreloaded.add(path)

  const components = matched
    .map(m => m.components?.default)
    .filter(component => typeof component === 'function')

  for (const component of components) {
    const promise = Promise.resolve((component as () => unknown)())
      .catch(() => {})
      .finally(() => promises.splice(promises.indexOf(promise)))
    promises.push(promise)
  }

  await Promise.all(promises)
}
