module.exports = function playVideo (section) {
  const video = section.querySelector('video')
  if (video) {
    video.currentTime = 0
    video.play()
  }
}
