<template>
  <div class="designer_container">
    <p>低代码表单解决方案，轻松应对各种业务场景</p>
    <br /><br />
    <div class="main_wrap" ref="wrapRef">
      <img src="/bg.png" alt="" />
      <img class="block1 floatable" src="/block1.png" alt="" />

      <div class="block_group">
        <img class="block2 floatable" src="/block2.png" alt="" />
        <img class="block3 floatable" src="/1.png" alt="" />
        <img class="block4 floatable" src="/2.png" alt="" />
        <img class="block5 floatable" src="/3.png" alt="" />
        <img class="block6 floatable" src="/4.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const wrapRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const wrap = wrapRef.value
  if (!wrap) return

  const block1 = wrap.querySelector('.block1') as HTMLElement
  const block2 = wrap.querySelector('.block2') as HTMLElement
  const block_group = wrap.querySelector('.block_group') as HTMLElement
  const pieces = wrap.querySelectorAll(
    '.block3, .block4, .block5, .block6',
  ) as NodeListOf<HTMLElement>
  // block1 浮动动画
  block1.animate(
    [
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-12px)' },
      { transform: 'translateY(0px)' },
    ],
    {
      duration: 3400,
      iterations: Infinity,
      easing: 'ease-in-out',
    },
  )

  // 鼠标3D悬浮效果
  const handleMouseMove = (e: MouseEvent) => {
    const rect = wrap.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 15
    const rotateY = (x / rect.width) * 15

    wrap.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(40px)
    `
  }

  const resetTilt = () => {
    wrap.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`
  }

  wrap.addEventListener('mouseenter', () => {
    wrap.style.transition = 'transform 0.3s ease-out'
    block2.classList.add('hide')
    pieces.forEach((b, i) => {
      b.classList.add('show')
      b.style.transitionDelay = `${i * 0.1}s` // 阶梯延迟
    })
  })

  wrap.addEventListener('mousemove', handleMouseMove)

  wrap.addEventListener('mouseleave', () => {
    wrap.style.transition = 'transform 0.6s ease'
    resetTilt()
    block2.classList.remove('hide')
    pieces.forEach((b) => {
      b.classList.remove('show')
      b.style.transitionDelay = '0s'
    })
  })

  onUnmounted(() => {
    wrap.removeEventListener('mousemove', handleMouseMove)
  })
})
</script>

<style scoped>
.designer_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px 0;
  perspective: 1200px;
}

.main_wrap {
  position: relative;
  width: 40%;
  display: inline-block;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  will-change: transform;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.main_wrap img {
  display: block;
  max-width: 100%;
  backface-visibility: hidden;
}

.block1,
.block_group,
.block3,
.block4,
.block5,
.block6 {
  position: absolute;
  pointer-events: none;
}

.block1 {
  top: -4%;
  left: -2.8%;
  width: 22%;
  transform: translateZ(15px);
}
.block_group {
  top: 0;
  right: 1%;
  width: 18%;
  height: 100%;
  transform: translateZ(40px);
}
/* block2（完整图片） */
.block2 {
  position: absolute;
  top: 5%;
  right: 1%;
  width: 100%;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.block2.hide {
  opacity: 0;
  /* transform: scale(1.05) translateZ(20px); */
}

/* block3-6 初始隐藏 */
.block3,
.block4,
.block5,
.block6 {
  left: 50%;
  transform: translateX(-50%) translateZ(0) scale(0.95);
  width: 120%;
  opacity: 0;
  transition:
    opacity 0.6s ease,
    transform 0.6s cubic-bezier(0.33, 1, 0.68, 1),
    box-shadow 0.3s ease;
  box-shadow: none;
}

/* 按竖向排布，每块稍微下移一点 */
.block3 {
  top: 0%;
}
.block4 {
  top: 21%;
}
.block5 {
  top: 50%;
}
.block6 {
  top: 80%;
}

/* hover 后立体浮出 */
.block3.show,
.block4.show,
.block5.show,
.block6.show {
  width: 120%;
  opacity: 1;
  transform: translateX(-50%) translateZ(50px) scale(1.03) rotateX(var(--rx, 0deg));
  /* box-shadow:
    0 16px 32px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.08); */
}

/* 不同深度 + 角度层次 */
.block3.show {
  --z: 70px;
  --rx: -6deg;
}
.block4.show {
  --z: 55px;
  --rx: -2deg;
}
.block5.show {
  --z: 40px;
  --rx: 2deg;
}
.block6.show {
  --z: 25px;
  --rx: 6deg;
}
</style>
