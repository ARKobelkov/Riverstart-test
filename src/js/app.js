import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

import '../icon.font'
import 'focus-visible'
import {OVERFLOW_HIDDEN} from './constants'

class App {
  scrollToOffset = 100

  constructor(config = {}) {
    Object.keys(config).forEach((key) => {
      if (Object.hasOwn(config, key)) {
        this[key] = config[key]
      }
    })

    this.initScrollTo()

    this.body = document.querySelector('body')
    this.header = document.querySelector('header')

    this.openMobileMenu()
    this.closeMobileMenu()
    this.openSubmenu()
    this.openMainMenu()

    setTimeout(() => {
      // include components here
    }, 0)
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

  openMobileMenu() {
    const pull = document.querySelector('.js-pull')
    const mobileMenu = document.querySelector('.js-mobile-menu')
    const body = this.body 

    pull.addEventListener('click', function() {
      mobileMenu.classList.add('_active')
      body.classList.add(OVERFLOW_HIDDEN)
    })
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.js-mobile-menu')
    const closeBtn = document.querySelector('.js-mobile-close')
    const body = this.body 

    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('_active')
      body.classList.remove(OVERFLOW_HIDDEN)
      this.closeSubmenu()
    })

    window.addEventListener('resize', (e) => {
      const width = body.clientWidth 
      if (width >= 1280) {
        mobileMenu.classList.remove('_active')
        body.classList.remove(OVERFLOW_HIDDEN)
        this.closeSubmenu()
      }
    })
  }

  openSubmenu() {
    const menu = document.querySelector('.js-menu')

    menu.addEventListener('click', function(e) {
      if (e.target.classList.contains('_arrow')) {
        e.preventDefault()
        const id = e.target.getAttribute('data')
        const submenu = document.getElementById(id)

        this.classList.add('_left')
        submenu.classList.add('_active')
      }
    })
  }

  closeSubmenu() {
    const menu = document.querySelector('.js-menu')
    const submenus = document.querySelectorAll('.js-submenu')

    menu.classList.remove('_left')
    submenus.forEach((submenu) => {
      submenu.classList.remove('_active')
    })
  }

  openMainMenu() {
    const submenus = document.querySelectorAll('.js-submenu')
    
    submenus.forEach((submenu) => {
      submenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('js-menu-back')) {
          this.closeSubmenu()
        }
      })
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App(appConfig || {})
})
