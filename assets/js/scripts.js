const navbar = document.querySelector('.navbar')
const colorBarHeight = document.getElementsByClassName('color-bar').offsetHeight
const colorBarWrapper = document.querySelector('.color-bar')
const scrollIndicators = document.querySelectorAll('.scroll-indicator circle')

const scrollUpButton = document.querySelector('.scroll-up')
const scrollDownButton = document.querySelector('.scroll-down')
const homeButton = document.querySelector('.link.home')
const aboutMeButton = document.querySelector('.link.about-me')
const processButton = document.querySelector('.link.process')
const portfolioButton = document.querySelector('.link.portfolio')
const linkUnderscore = document.querySelector('.link-underscore')

const sidebarCarousel = document.getElementById('sidebarCarousel')
const sectionCarousel = document.querySelector('main')
const sidebarCells = sidebarCarousel.querySelectorAll('.carousel-cell')
const sectionCells = sectionCarousel.querySelectorAll('.section')

let sectionPositions = []
let sections = []
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

recalculateSectionPositions()

function recalculateSectionPositions() {
  console.log('Re-calculating section positions')

  sections = [].slice.call(document.querySelectorAll('.section'))

  sectionPositions = sections.map((section) => section.offsetTop)
}

function scheduleSectionPositionRecalculation() {
  window.requestAnimationFrame(recalculateSectionPositions)
}

window.addEventListener('resize', scheduleSectionPositionRecalculation)

function indexOfCurrentSection() {
  const scrollPosition = window.pageYOffset

  let i = 0
  while (scrollPosition >= sectionPositions[i] - window.innerHeight / 2) {
    i++
  }

  return i - 1
}

function indexOfPreviousSection() {
  return (indexOfCurrentSection() - 1) % sectionPositions.length
}

function indexOfNextSection() {
  return (indexOfCurrentSection() + 1) % sectionPositions.length
}

function sectionIndexToPosition(sectionIndex) {
  if (sectionIndex < 0) {
    throw new Error('Negative section indices are not allowed')
  }
  if (sectionIndex > sectionPositions.length - 1) {
    throw new Error('Section index out of bounds')
  }

  return sectionPositions[sectionIndex]
}

function scrollToSectionIndex(sectionIndex) {
  try {
    const sectionPosition = sectionIndexToPosition(sectionIndex)

    window.scrollTo({
      behavior: 'smooth',
      top: sectionPosition,
    })
  } catch {
    console.log('Could not scroll to section index ' + sectionIndex)
  }
}

function scrollToPreviousSection() {
  const sectionIndex = indexOfPreviousSection()
  scrollToSectionIndex(sectionIndex)
}

function scrollToNextSection() {
  const sectionIndex = indexOfNextSection()
  scrollToSectionIndex(sectionIndex)
}

function scrollToHomeSection() {
  const sectionIndex = 0
  scrollToSectionIndex(sectionIndex)
  homeButton.style.left = homeUnderscorePosition
}

function scrollToAboutMeSection() {
  const sectionIndex = 1
  scrollToSectionIndex(sectionIndex)
}

function scrollToResumeSection() {
  const sectionIndex = 2
  scrollToSectionIndex(sectionIndex)
}

function scrollToPortfolioSection() {
  const sectionIndex = 3
  scrollToSectionIndex(sectionIndex)
}

function scrollToLatestWorkSection() {
  const sectionIndex = 4
  scrollToSectionIndex(sectionIndex)
}

function doSomething(scroll_pos) {
  // navbar.style.transform = `translateX(${scroll_pos}px)`
  // Do something with the scroll position

  // scroll measurments
  const isScrolledSectionZero =
    scroll_pos >= 0 && scroll_pos < 0.5 * window.innerHeight
  const isScrolledSectionOne =
    scroll_pos >= 0.5 * window.innerHeight &&
    scroll_pos < 1.5 * window.innerHeight
  const isScrolledSectionTwo =
    scroll_pos >= 1.5 * window.innerHeight &&
    scroll_pos < 2.5 * window.innerHeight

  if (!isCollapsed && indexOfCurrentSection() == 0) {
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

window.addEventListener('scroll', function (e) {
  last_known_scroll_position = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position)
      ticking = false
    })

    ticking = true
  }
})

doSomething(window.scrollY)

// lottie animations

// const LottieAnimations = {
//   colorbar: lottie.loadAnimation({
//     container: document.querySelector('.color-bar .lottie'),
//     isFrame: true,
//     autoplay: true,
//     loop: true,
//     renderer: 'svg',
//     preserveAspectRatio: 'none',
//     path: 'assets/animations/color-bar.json',
//   }),
// }

// sidebar carousel logic
var cellIndex = 0
var selectedArray = [0, 1, 2, 3]
var rotateFn = 'rotateX'
var radius, theta

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
    'translateZ(' + -cellRadius + 'px) ' + rotateFn + '(' + angle + 'deg)'
}

function changeCarousel() {
  sectionRadius = Math.round(window.innerHeight / 2 / Math.tan(Math.PI / 4))
  cellRadius = Math.round(70 / 2 / Math.tan(Math.PI / 4))
  for (var i = 0; i < sidebarCells.length; i++) {
    var cell = sidebarCells[i]
    var section = sectionCells[i]
    if (i < 4) {
      // visible cell
      cell.style.opacity = 1
      var cellAngle = 90 * i
      cell.style.transform =
        rotateFn + '(' + cellAngle + 'deg) translateZ(' + cellRadius + 'px)'
      section.style.transform =
        rotateFn + '(' + -cellAngle + 'deg) translateZ(' + sectionRadius + 'px)'
    } else {
      // hidden cell
      cell.style.color = '#ffffff'
      cell.style.opacity = 0
      cell.style.transform = 'none'
    }
  }

  // sidebarCarousel.rotate
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
let sectionCarouselRotate = rotateCarousel.bind(sectionCarousel)

advanceCarousel()

// tween animations for each section
var controller = new ScrollMagic.Controller({container: 'main'})
const sectionHeight = sectionCells[0].offsetHeight

var t1 = TweenMax.to('#body-carousel', 1, {
  ease: Power2.easeOut,
  rotationX: '-=90',
  z: Math.round(-0.5 * sectionHeight)
})

var firstSection = new ScrollMagic.Scene({
  triggerElement: '.carousel.scene',
  duration: sectionHeight,
  offset: -.1,
  triggerHook: 0
})
  .setTween(t1)
  .setPin('.carousel.scene')
  .addTo(controller)

scrollUpButton.addEventListener('click', scrollToPreviousSection)
scrollDownButton.addEventListener('click', scrollToNextSection)

homeButton.addEventListener('click', scrollToHomeSection)
aboutMeButton.addEventListener('click', scrollToAboutMeSection)
portfolioButton.addEventListener('click', scrollToPortfolioSection)
// colorBarWrapper.addEventListener('mouseover', function (event) {
//   LottieAnimations.colorbar.setSpeed(1)
// })
// colorBarWrapper.addEventListener('mouseleave', function (event) {
//   LottieAnimations.colorbar.setSpeed(0.5)
// })
