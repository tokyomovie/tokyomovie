function pause() {
  console.log('existenZ is paused')
  document.body.innerHTML = ''
}
function init() {
  const pauseButton = document.querySelector('.if-you-dare')
  pauseButton.addEventListener('click', pause)
}
window.addEventListener('load', (event) => {
  init()
})
