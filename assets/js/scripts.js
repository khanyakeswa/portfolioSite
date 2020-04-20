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
const sectionCarousel = document.querySelector('.carousel.scene')
const main = document.querySelector('main')
const sidebarCells = sidebarCarousel.querySelectorAll('.carousel-cell')
const sectionCells = main.querySelectorAll('.section')
const placeHolderSections = main.querySelectorAll('.placeholder')

let sectionPositions = []
let carouselSections = []
let sections = []
let sectionOffset = 0
let last_known_scroll_position = 0
let ticking = false
let isCollapsed = false
let isTransitioned = false
let spliced = false

let enterSectionOne = false
let enterSectionTwo = false
let enterSectionThree = false
let enterSectionFour = false
let enterSectionFive = false
let enterSectionSix = false
let enterSectionSeven = false

function recalculateSectionPositions() {
  console.log('Re-calculating section positions')

  sections = [].slice.call(document.querySelectorAll('.section'))
  if (!spliced) {
    let splicer = () => {
      carouselSections = sections.splice(0, 4)
      spliced == true
    }
    splicer()
  }

  // sectionOffset = 0
  // for (let i = 0; i < 4; i++) {
  //   console.log(sectionOffset)
  //   const newTop = sectionOffset.toString() + 'px'
  //   placeHolderSections[i].style.top = newTop
  //   sectionOffset += carouselSections[i].offsetHeight;
  // }

  sectionPositions = sections.map(function (sec) {
    return sec.offsetTop
  })
}

function scheduleSectionPositionRecalculation() {
  window.requestAnimationFrame(recalculateSectionPositions)
}
scheduleSectionPositionRecalculation()

window.addEventListener('resize', scheduleSectionPositionRecalculation)

function indexOfCurrentSection() {
  const scrollPosition = main.scrollTop

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
    'translateZ(' + 0 + 'px) ' + rotateFn + '(' + angle + 'deg)'
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
        rotateFn + '(' + cellAngle + 'deg)'
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
      setTimeout(advanceCarousel, 1700)
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
// let sectionCarouselRotate = rotateCarousel.bind(main)

advanceCarousel()

// tween animations for each section
var controller = new ScrollMagic.Controller({ container: '.main-body' })
var sectionHeight = sectionCells[0].offsetHeight
var carouselSpan = Math.round(sectionCells[0].offsetHeight + sectionCells[1].offsetHeight + sectionCells[2].offsetHeight + sectionCells[3].offsetHeight)

//Timelines
var firstSectionTimeline = new TimelineMax()
  .to(
    '.landing.section',
    1,
    {
      // ease: Power2.out,
      // yoyoEase:true,
      immediateRender: true,
      rotationX: '+=90',
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
    '-=1'
  )
  .fromTo(
    '.about-me .shadow',
    1,
    {
      autoAlpha: 1,
    },
    {
      autoAlpha: 0,
    },
    '-=1'
  )

// var secondSectionTimeline = new TimelineMax({
//   smoothChildTiming: true,
// })
//   .to(
//     '#section',
//     1,
//     {
//       // ease: Power2.out,
//       // yoyoEase:true,
//       immediateRender: true,
//       rotationX: '+=90',
//       force3d: false
//     },
//     '-=1'
//   )
//   .fromTo(
//     '.resume .shadow',
//     1,
//     {
//       autoAlpha: 1,
//     },
//     {
//       autoAlpha: 0,
//     },
//     '-=1'
//   )

// var thirdSectionTimeline = new TimelineMax({
//   smoothChildTiming: true,
// })
//   .fromTo(
//     '#body-carousel',
//     1,
//     {
//       // ease: Power2.out,
//       // yoyoEase:true,
//       immediateRender: true,
//       rotationX: 180,
//     },
//     {
//       // ease: Power2.out,
//       // yoyoEase:true,
//       immediateRender: true,
//       rotationX: 270,
//     },
//     '-=1'
//   )
//   .fromTo(
//     '.portfolio .shadow',
//     1,
//     {
//       autoAlpha: 1,
//     },
//     {
//       autoAlpha: 0,
//     },
//     '-=1'
//   )

var firstSection = new ScrollMagic.Scene({
  triggerElement: '.carousel.scene',
  duration: sectionHeight,
  offset: -0.1,
  triggerHook: 0,
})
  .setTween(firstSectionTimeline)
  .addIndicators({
    name: 'triggerDown', // custom name for your scene
    indent: 520, // indent from the browser edge
    colorStart: 'green', // custom color - colorEnd
    colorTrigger: 'red',
  })
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
