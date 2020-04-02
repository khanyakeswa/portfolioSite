'use strict';
const colorBarWrapper = document.querySelector('.color-bar')

const LottieAnimations = {
  colorbar: lottie.loadAnimation({
    container: document.querySelector('.color-bar .lottie'),
    isFrame: true,
    autoplay: true,
    loop: true,
    renderer: 'svg',
    preserveAspectRatio: 'none',
    path: '/animations/color-bar.json'
  }),
}

colorBarWrapper.addEventListener('mouseover', function(event) {
  LottieAnimations.colorbar.setSpeed(1)
})
colorBarWrapper.addEventListener('mouseleave', function(event) {
  LottieAnimations.colorbar.setSpeed(.5)
})
