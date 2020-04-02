const LottieAnimations = {
  colorbar: lottie.loadAnimation({
    container: document.querySelector('.color-bar .body'),
    isFrame: true,
    autoplay: true,
    renderer: 'svg',
    path: 'color-bar.json'
  })
}
