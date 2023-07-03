<template>
  <div class="target" ref="targetRef">
    <div class="container">
      <div class="card">
        <slot></slot>
        <div class="window">
          <slot name="window"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const targetRef = ref<HTMLDivElement | null>(null)

const rollVal = ref(0)
const tiltVal = ref(0)

const { tilt, roll } = useParallax(targetRef)

const onMouseMoveHandler = () => {
  tiltVal.value = tilt.value
  rollVal.value = roll.value
}

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    rollScale?: number
    tiltScale?: number
  }>(),
  {
    width: '15rem',
    height: '20rem',
    rollScale: 10,
    tiltScale: 10
  }
)
const targetWidth = computed(() => `calc(${props.width} * 1.1)`)
const targetHeight = computed(() => `calc(${props.height} * 1.1)`)
const computedRoll = computed(() => `${rollVal.value * props.rollScale}deg`)
const computedTilt = computed(() => `${tiltVal.value * props.tiltScale}deg`)

onMounted(() => {
  ;(targetRef.value as HTMLDivElement).addEventListener('mousemove', onMouseMoveHandler)
})

onBeforeUnmount(() => {
  ;(targetRef.value as HTMLDivElement).removeEventListener('mousemove', onMouseMoveHandler)
})
</script>

<style lang="scss" scoped>
.target {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: v-bind(targetWidth);
  height: v-bind(targetHeight);
  transition: 0.3s ease-out all;
  .container {
    margin: 3em auto;
    perspective: 300px;
    .card {
      width: v-bind(width);
      height: v-bind(height);
      background: #fff;
      border-radius: 5px;
      border: 1px solid #cdcdcd;
      overflow: hidden;
      transition: 0.3s ease-out all;
      box-shadow: 0 0 20px 0 rgba(255, 255, 255, 0.25);
      transform: rotateX(v-bind(computedRoll)) rotateY(v-bind(computedTilt));
      .window {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        height: 100%;
        width: 100%;
        padding: 5px;
      }
    }
  }
}
</style>
