import '../icon.font'
import 'focus-visible'
import {OVERFLOW_HIDDEN, VAR_PADDING_RIGHT, VAR_PADDING_RIGHT_PX} from './constants'

class App {
  scrollToOffset = 100

  constructor(config = {}) {
    Object.keys(config).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        this[key] = config[key]
      }
    })

    this.initScrollTo()

    this.body = document.querySelector('body')
    this.header = document.querySelector('header')

    // svgsprite
    this.importAll(require.context('../svgsprite', false, /\.svg$/))
  }

  initScrollTo() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.js-scroll[data-scroll]')
      if (trigger) {
        const target = document.querySelector(trigger.dataset.scroll)
        if (target) {
          const y =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            this.scrollToOffset
          window.scrollTo({top: y, behavior: 'smooth'})
        }
      }
    })
  }

  importAll(r) {
    r.keys().forEach(r)
  }

  setFocusInModal(modal, openBtn, excludeSelector = '') {
    openBtn = openBtn?.[0] || openBtn
    excludeSelector = excludeSelector ? `:not(${excludeSelector})` : ''
    const focusableElements =
      `button${excludeSelector}, [href]${excludeSelector}, input${excludeSelector}, select${excludeSelector}, textarea${excludeSelector}, [tabindex]:not([tabindex="-1"])${excludeSelector}`

    if (!modal) return

    const focusableContent = modal.querySelectorAll(focusableElements)
    if (!focusableContent.length) return

    let firstFocusableElement = focusableContent[0]
    let lastFocusableElement = focusableContent[
    focusableContent.length - 1
      ]

    const listener = (e) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === 9
      if (!isTabPressed) {
        return
      }

      firstFocusableElement = [...focusableContent].find(el => window.getComputedStyle(el).visibility !== 'hidden') || firstFocusableElement
      lastFocusableElement = [...focusableContent].reverse().find(el => window.getComputedStyle(el).visibility !== 'hidden') || lastFocusableElement

      if (e.shiftKey) {
        // if shift key pressed for shift + tab combination
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus() // add focus for the last focusable element
          e.preventDefault()
        }
      } else if (document.activeElement === lastFocusableElement) {
        // if tab key is pressed
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus() // add focus for the first focusable element
        e.preventDefault()
      }
    }


    document.addEventListener('keydown', listener, false)

    setTimeout(() => {
      firstFocusableElement.focus()
    }, 500)

    return () => {
      document.removeEventListener('keydown', listener, false)

      if (openBtn) {
        setTimeout(() => {
          openBtn.focus()
        }, 500)
      }
    }
  }

  isElementInViewport(el, horizontalOnly = false) {
    const rect = el.getBoundingClientRect()
    const horizontal = rect.left >= 0 && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    const vertical = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)

    return (
      horizontalOnly ? horizontal : horizontal && vertical
    )
  }

  addOverflowHiddenBody() {
    const padding = this.getScrollbarWidth()
    this.body.style.paddingRight = padding + 'px'
    this.body.style.setProperty(VAR_PADDING_RIGHT, padding / 10 + 'rem')
    this.body.style.setProperty(VAR_PADDING_RIGHT_PX, padding + 'px')
    this.body.classList.add(OVERFLOW_HIDDEN)
  }

  removeOverflowHiddenBody() {
    this.body.classList.remove(OVERFLOW_HIDDEN)
    this.body.style.paddingRight = ''
    this.body.style.removeProperty(VAR_PADDING_RIGHT)
    this.body.style.removeProperty(VAR_PADDING_RIGHT_PX)
  }

  getScrollbarWidth() {
    const documentWidth = document.documentElement.clientWidth
    return Math.abs(window.innerWidth - documentWidth)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App(appConfig || {})
})
