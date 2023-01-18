class SvgspriteClass {
  constructor() {
    // svgsprite
    this.importAll(require.context('../svgsprite', false, /\.svg$/))
  }

  importAll(r) {
    r.keys().forEach(r)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SvgspriteClass()
})
