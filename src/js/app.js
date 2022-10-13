import '../scss/app.scss'
import '../icon.font'

class App {
    scrollToOffset = 100

    constructor(config = {}) {
        Object.keys(config).forEach((key) => {
            if (this.hasOwnProperty(key)) {
                this[key] = config[key]
            }
        })

        this.initScrollTo()

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
                    window.scrollTo({ top: y, behavior: 'smooth' })
                }
            }
        })
    }

    importAll(r) {
        r.keys().forEach(r)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App(appConfig || {})
})
