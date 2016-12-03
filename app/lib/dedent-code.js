const dedent = require('dedent')

document.querySelectorAll('pre code').forEach(block => {
  block.textContent = dedent(block.textContent)
})
