const navbar = document.querySelector('.navbar', '.portfolio-button')
const colorBarHeight = document.getElementsByClassName('color-bar');
const colorBarWrapper = document.querySelector('.color-bar')
const carousel = document.querySelector('.carousel')
const cells = carousel.querySelectorAll('.carousel-cell')
const cellHeight = cells[0].offsetHeight

let last_known_scroll_position = 0
let ticking = false
let isCollapsed = false
let isTransitioned = false

let enterSectionOne = false
let enterSectionTwo = false
let enterSectionThree = false
let enterSectionFour = false
let enterSectionFive = false
let enterSectionSix = false
let enterSectionSeven = false

let exitSectionOne = false
let exitSectionTwo = false
let exitSectionThree = false
let exitSectionFour = false
let exitSectionFive = false
let exitSectionSix = false
let exitSectionSeven = false

function doSomething(scroll_pos) {
  // navbar.style.transform = `translateX(${scroll_pos}px)`
  // Do something with the scroll position

  // scroll measurments
  const isScrolledSectionZero = scroll_pos >= 0 && scroll_pos < 0.5 * window.innerHeight
  const isScrolledSectionOne = scroll_pos >= 0.5 * window.innerHeight && scroll_pos < 1.5 * window.innerHeight
  const isScrolledSectionTwo = scroll_pos >= 1.5 * window.innerHeight && scroll_pos < 2.5 * window.innerHeight
  
  if (!isCollapsed && !isScrolledSectionZero) {
    document.body.classList.add('collapsed')
    isCollapsed = true
  }
  if (isCollapsed && isScrolledSectionZero) {
    document.body.classList.remove('collapsed')
    isCollapsed = false
  }

  //Scrolled to first section
  if (isScrolledSectionZero) {
    document.body.classList.add('current-section-1')
  }
  if (!isScrolledSectionZero) {
    document.body.classList.remove('current-section-1')
  }

  if (isScrolledSectionOne) {
    document.body.classList.add('current-section-2')
  }
  if (!isScrolledSectionOne) {
    document.body.classList.remove('current-section-2')
  }
}

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position)
      ticking = false
    })

    ticking = true
  }
})

doSomething(window.scrollY)

// lottie animations

const LottieAnimations = {
  colorbar: lottie.loadAnimation({
    container: document.querySelector('.color-bar .lottie'),
    isFrame: true,
    autoplay: true,
    loop: true,
    renderer: 'svg',
    preserveAspectRatio: 'none',
    path: 'assets/animations/color-bar.json'
  }),
}

colorBarWrapper.addEventListener('mouseover', function(event) {
  LottieAnimations.colorbar.setSpeed(1)
})
colorBarWrapper.addEventListener('mouseleave', function(event) {
  LottieAnimations.colorbar.setSpeed(.5)
})

// section carousel logic



// sidebar carousel logic
var selectedIndex = 0
var selectedArray = [0, 1, 2, 3]
var rotateFn = 'rotateX'
var radius, theta
// console.log( cellWidth, cellHeight );

function rotateCarousel() {
  if (selectedArray[0] == 0) {
    carousel.classList.add('firstCell')
  }
  else {
    carousel.classList.remove('firstCell')
  }

  if (selectedArray[0] == 1) {
    carousel.classList.add('secondCell')
  }
  else {
    carousel.classList.remove('secondCell')
  }

  if (selectedArray[0] == 2) {
    carousel.classList.add('thirdCell')
  }
  else {
    carousel.classList.remove('thirdCell')
  }

  if (selectedArray[0] == 3) {
    carousel.classList.add('fourthCell')
  }
  else {
    carousel.classList.remove('fourthCell')
  }
  var angle = 90 * selectedIndex * -1
  carousel.style.transform =
    'translateZ(' + -radius + 'px) ' + rotateFn + '(' + angle + 'deg)'
}

var cellsRange = 4

function changeCarousel() {
  radius = Math.round(cellHeight / 2 / Math.tan(Math.PI / 4))
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    if (i < 4) {
      // visible cell
      cell.style.opacity = 1
      var cellAngle = 90 * i
      cell.style.transform =
        rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)'
    } else {
      // hidden cell
      cell.style.color = '#ffffff'
      cell.style.opacity = 0
      cell.style.transform = 'none'
    }
  }

  rotateCarousel()
}

function onOrientationChange() {
  changeCarousel()
}

// set initials
onOrientationChange()

function arrayRotate(arr, reverse) {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}

function advanceCarousel() {
  requestAnimationFrame(() => {
    showCarouselIfNotVisibleAlready(() => {
      selectedIndex++
      var currentIndex = selectedArray.shift()
      selectedArray.push(currentIndex)
      rotateCarousel()
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
  }, 500)
}

advanceCarousel()




