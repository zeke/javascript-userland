document.querySelectorAll('link[rel="import"]').forEach(function (slide) {
  let template = slide.import.querySelector('[data-parent]')
  document.getElementById(template.dataset.parent).appendChild(template)
})
