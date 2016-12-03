document.addEventListener('keyup', event => {
  switch (event.key) {
    case 'Escape':
      let win = remote.getCurrentWindow()
      win.setFullScreen(!win.isFullScreen())
      break
  }
})
