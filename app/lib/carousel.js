const Config = require('electron-config')
const config = new Config()

class Carousel {
  constructor(selector) {
    this.selector = selector
    this.slideCount = document.querySelectorAll(`${selector} > *`).length
    this.current = config.get('currentSlide') || 1
    this.showCurrent()
  }

  next (event) {
    if (event) event.preventDefault
    if (this.current < this.slideCount) ++this.current
    this.showCurrent()
  }

  prev (event) {
    if (event) event.preventDefault
    if (this.current > 1) --this.current
    this.showCurrent()
  }

  showCurrent () {
    config.set('currentSlide', this.current)
    document.body.scrollTop = window.innerHeight*(this.current-1)
  }

  static new (selector) {
    return new Carousel(selector)
  }
}

const carousel = Carousel.new('#slides')

// prevent arrow keys from slightly scrolling the page
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'PageDown':
    case 'PageUp':
    case 'ArrowDown':
    case 'ArrowRight':
    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      break
  }
})

document.addEventListener('keyup', event => {
  switch (event.key) {
    case 'ArrowDown':
    case 'ArrowRight':
    case 'PageDown':
      event.preventDefault()
      carousel.next(event)
      break
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'PageUp':
      event.preventDefault()
      carousel.prev(event)
      break
  }
})
