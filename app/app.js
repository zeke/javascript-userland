NodeList.prototype.forEach = Array.prototype.forEach

const {desktopCapturer, remote, shell} = require('electron')
const inView = require('in-view')
const typewriter = require('./lib/typewriter')
const prettyNumbers = require('./lib/pretty-numbers')
const externalLinks = require('./lib/external-links')
const logNotes = require('./lib/notes')
const playVideo = require('./lib/video')
require('./lib/slides')
require('./lib/carousel')
require('./lib/keyboard')
require('./lib/dedent-code')

function updateDOM () {
  prettyNumbers()
  openLinksExternally()
}

// Give each section an active class when it's visible in the viewport
inView('section')
  .on('enter', section => {
    section.classList.add('active')
    logNotes(section)
    typewriter(section)
    playVideo(section)
  })
  .on('exit', section => {
    section.classList.remove('active')
  })
