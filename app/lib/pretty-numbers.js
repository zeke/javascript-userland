module.exports = function prettyNumbers () {
  document.querySelectorAll('.pretty-number').forEach(function (el) {
    el.textContent = Number(el.textContent).toLocaleString()
  })
}
