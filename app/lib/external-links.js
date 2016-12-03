// Open all http links in external browser
module.exports = function openLinksExternally () {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault()
      shell.openExternal(link.getAttribute('href'))
    })
  })
}
