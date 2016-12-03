const malarkey = require('malarkey')

module.exports = function typewriter(section) {

  // Lock container size to original content, to prevent scaling as typing occurs
  const figure = section.querySelector('figure')
  if (figure) {
    figure.style.width = figure.offsetWidth + 'px';
    figure.style.height = figure.offsetHeight + 'px';
  }

  // Type stuff out
  section.querySelectorAll('[data-typewriter]').forEach(el => {
    const defaults = {
      text: el.textContent,
      pause: 100,
      speed: 30,
      loop: false,
      postfix: ''
    }

    // data attributes on the element override the defaults
    const opts = Object.assign(defaults, el.dataset)

    // coerce strings to numbers
    opts.pause = Number(opts.pause)
    opts.speed = Number(opts.speed)

    // Malarkey.clear() is not always fast enough, and sometimes there's
    // a visible flicker of the initital text. So nuke it this way instead.
    el.textContent = ''

    malarkey(el, opts)
      .pause(opts.pause)
      .type(opts.text)
  })
}
