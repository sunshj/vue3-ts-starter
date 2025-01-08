<template>
  <RouterLink ref="el" :to="props.to" class="app-link">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = withDefaults(
  defineProps<{
    to: RouteLocationRaw
    prefetch?: boolean
    prefetchOn?: 'interaction' | 'visibility'
  }>(),
  {
    prefetch: false,
    prefetchOn: 'visibility'
  }
)

const el = ref<HTMLAnchorElement | null>(null)

function shouldPrefetch(mode: 'interaction' | 'visibility') {
  return route.path !== props.to && props.prefetch === true && props.prefetchOn === mode
}

const cleanup = useEventListener(
  el,
  ['pointerenter', 'focus'],
  () => {
    if (shouldPrefetch('interaction')) {
      preloadRouteComponents(props.to, router)
      cleanup()
    }
  },
  { once: true }
)

const { stop } = useIntersectionObserver(el, entries => {
  if (shouldPrefetch('visibility')) {
    for (const entry of entries) {
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0
      if (isVisible) {
        preloadRouteComponents(props.to, router)
        stop()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.app-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
</style>
