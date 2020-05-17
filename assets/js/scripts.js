;(function () {
  var el = document.querySelector('.landing .bg')
  var loadingImage = new Image()
  loadingImage.src = '/assets/imgs/splash.jpg'
  loadingImage.addEventListener('load', function () {
    el.style.opacity = '1'
  })
  var cellIndex = 0
  var selectedArray = [0, 1, 2, 3]
  var rotateFn = 'rotateX'
  var radius, theta

  const sidebarCarousel = document.getElementById('sidebar-carousel')
  const sidebarCells = sidebarCarousel.querySelectorAll('.carousel-cell')
  const scrollButton = document.querySelector('.about-me-dropdown .button')
  const splash = document.querySelector('.bg')
  const aboutMeSection = document.querySelector('#about-me')

  scrollButton.addEventListener('click', function () {
    aboutMeSection.scrollIntoView()
  })

  function rotateCarousel() {
    if (selectedArray[0] == 0) {
      sidebarCarousel.classList.add('firstCell')
    } else {
      sidebarCarousel.classList.remove('firstCell')
    }

    if (selectedArray[0] == 1) {
      sidebarCarousel.classList.add('secondCell')
    } else {
      sidebarCarousel.classList.remove('secondCell')
    }

    if (selectedArray[0] == 2) {
      sidebarCarousel.classList.add('thirdCell')
    } else {
      sidebarCarousel.classList.remove('thirdCell')
    }

    if (selectedArray[0] == 3) {
      sidebarCarousel.classList.add('fourthCell')
    } else {
      sidebarCarousel.classList.remove('fourthCell')
    }
    var angle = 90 * cellIndex * -1
    this.style.transform =
      'translateZ(' + 0 + 'px) ' + rotateFn + '(' + angle + 'deg)'
  }

  function changeCarousel() {
    let cellRadius = Math.round(55 / 2 / Math.tan(Math.PI / 4))

    for (var i = 0; i < sidebarCells.length; i++) {
      var cell = sidebarCells[i]
      if (i < 4) {
        var cellAngle = -90 * i
        cell.style.transform =
          rotateFn + '(' + -cellAngle + 'deg) translateZ(' + cellRadius + 'px)'
      } else {
        // hidden cell
        cell.style.color = '#ffffff'
        cell.style.opacity = 0
        cell.style.transform = 'none'
      }
    }
  }

  function onOrientationChange() {
    changeCarousel()
  }

  onOrientationChange()

  function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop())
    else arr.push(arr.shift())
    return arr
  }

  function advanceCarousel() {
    requestAnimationFrame(() => {
      showCarouselIfNotVisibleAlready(() => {
        cellIndex++
        var currentIndex = selectedArray.shift()
        selectedArray.push(currentIndex)
        sidebarCarouselRotate()
        setTimeout(advanceCarousel, 2000)
      })
    })
  }

  let isCarouselVisible = false
  function showCarouselIfNotVisibleAlready(callback) {
    if (isCarouselVisible) {
      callback()
      return
    }

    setTimeout(() => {
      document.querySelector('.carousel').classList.add('visible')
      isCarouselVisible = true
      callback()
    }, 100)
  }

  let sidebarCarouselRotate = rotateCarousel.bind(sidebarCarousel)

  advanceCarousel()

  var controller = new ScrollMagic.Controller()

  var tween = TweenMax.to(splash, 1, {
    autoAlpha: 0,
  })
  var scrollScene = new ScrollMagic.Scene({
    triggerElement: '.landing',
    duration: '100%',
    triggerHook: 0,
  })
  .setTween(tween)
  .addTo(controller)
})()
