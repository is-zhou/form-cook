// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import WebUI from './components/WebUI.vue'
import ProfileList from './components/ProfileList.vue'
const isProd = process.env.NODE_ENV === 'production'
const repoBase = isProd ? '/form-cook/' : '/'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "home-features-after": () =>
        [
          h(WebUI),
          h(ProfileList)
        ]
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    if (typeof window !== 'undefined') {
      router.onAfterRouteChange = (to) => {
        console.log('router.onAfterRouteChange----------', to);

        if (to === repoBase) {
          requestAnimationFrame(setupHeroTilt)
        }
      }
    }
  }
} satisfies Theme

function setupHeroTilt() {
  const img = document.querySelector('.VPImage.image-src') as HTMLImageElement
  if (!img) return

  const container = img.parentElement
  if (!container) return

  let maxTilt = 15
  const ease = 0.1

  let targetX = 0, targetY = 0
  let currentX = 0, currentY = 0
  let raf = 0
  let mouseHover = false

  // 初始化
  img.style.transformOrigin = 'center center'
  img.style.willChange = 'transform'
  img.style.transform = 'translate(-50%, -50%) perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  img.style.transition = 'transform 0.1s ease-out'

  container.addEventListener('mousemove', (e) => {
    maxTilt = 50
    mouseHover = true
    const rect = container.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const percentX = (offsetX - centerX) / centerX
    const percentY = (offsetY - centerY) / centerY

    targetX = percentY * maxTilt * -1
    targetY = percentX * maxTilt

    if (!raf) raf = requestAnimationFrame(update)
  })

  container.addEventListener('mouseleave', () => {
    maxTilt = 15
    mouseHover = false
    targetX = 0
    targetY = 0
    if (!raf) raf = requestAnimationFrame(update)
  })

  function update() {
    const dx = targetX - currentX
    const dy = targetY - currentY
    currentX += dx * ease
    currentY += dy * ease

    img.style.transform = `
      translate(-50%, -50%)
      perspective(800px)
      rotateX(${currentX}deg)
      rotateY(${currentY}deg)
      translateZ(0)
    `

    if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
      raf = requestAnimationFrame(update)
    } else {
      raf = 0
    }
  }

  // 自动摆动循环
  const autoSequence = [
    { x: -maxTilt / 2, y: -maxTilt / 2 },
    { x: maxTilt / 2, y: maxTilt / 2 },
    { x: -maxTilt / 3, y: maxTilt / 3 },
    { x: 0, y: 0 }
  ]

  let step = 0
  function autoTiltLoop() {
    if (!mouseHover) {
      const target = autoSequence[step % autoSequence.length]
      targetX = target.x
      targetY = target.y
      if (!raf) raf = requestAnimationFrame(update)
      step++
    }
    setTimeout(autoTiltLoop, 2000) // 每 ***ms 执行一次
  }

  setTimeout(autoTiltLoop, 500) // 页面加载 500ms 后启动
}
