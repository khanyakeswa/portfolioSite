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

const sidebarCarousel = document.getElementById('sidebar-carousel')
const sectionsContainer = document.querySelector('.sections-container')
const sectionCarousel = document.getElementById('.non-static')
const sidebarCells = sidebarCarousel.querySelectorAll('.carousel-cell')
const sectionCells = sectionsContainer.querySelectorAll('#section')
const placeHolderSections = sectionsContainer.querySelectorAll('.placeholder')
const sectionContent = sectionsContainer.querySelectorAll('.section-content')

const homeSection = document.querySelector('#section.home')
const homeContent = document.querySelector('#content.home')
const aboutMeSection = document.querySelector('#section.about-me')
const aboutMeContent = document.querySelector('#content.about-me')
const resumeSection = document.querySelector('#section.resume')
const resumeContent = document.querySelector('#content.resume')
const portfolioSection = document.querySelector('#section.portfolio')
const portfolioContent = document.querySelector('#content.portfolio')
const contactSection = document.querySelector('.contact')

let sectionPositions = []
let carouselSections = []
let sections = []
let containerHeight = sectionsContainer.offsetHeight
let sectionHeight = homeSection.offsetHeight
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
  containerHeight = sectionsContainer.offsetHeight
  sectionHeight = sectionCells[0].offsetHeight
  document.body.classList.remove('collapsed')
  console.log('Re-calculating section positions')

  const sections = [].slice.call(document.querySelectorAll('.placeholder'))

  sectionPositions = sections.map((section) => section.offsetTop)
}

function scheduleSectionPositionRecalculation() {
  window.requestAnimationFrame(recalculateSectionPositions)
}
scheduleSectionPositionRecalculation()

window.addEventListener('resize', scheduleSectionPositionRecalculation)

function indexOfCurrentSection() {
  const scrollPosition = sectionsContainer.scrollTop

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

    sectionsContainer.scrollTo({
      behavior: 'smooth',
      top: sectionPosition,
    })
  } catch {
    alert('Could not scroll to section index ' + sectionIndex)
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
  // homeButton.style.left = homeUnderscorePosition
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

function scrollToContactSection() {
  const sectionIndex = 4
  scrollToSectionIndex(sectionIndex)
}

function doSomething(scroll_pos) {
  // navbar.style.transform = `translateX(${scroll_pos}px)`
  // Do something with the scroll position
  //Scrolled to first section
  if (indexOfCurrentSection() == 0) {
    document.body.classList.add('current-section-1')
    document.body.classList.remove('collapsed')
  }
  else {
    document.body.classList.remove('current-section-1')
    document.body.classList.add('collapsed')
  }
  if (indexOfCurrentSection() == 1) {
    document.body.classList.add('current-section-2')
  }
  else {
    document.body.classList.remove('current-section-2')
  }
  if (indexOfCurrentSection() == 2) {
    document.body.classList.add('current-section-3')
  }
  else {
    document.body.classList.remove('current-section-3')
  }
  if (indexOfCurrentSection() == 3) {
    document.body.classList.add('current-section-4')
  }
  else {
    document.body.classList.remove('current-section-4')
  }
}

sectionsContainer.addEventListener('scroll', function (e) {
  last_known_scroll_position = sectionsContainer.scrollTop

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position)
      ticking = false
    })

    ticking = true
  }
})

doSomething(sectionsContainer.scrollTop)

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
  let cellRadius = Math.round(70 / 2 / Math.tan(Math.PI / 4))
  let sectionRadius = Math.round(sectionHeight / 2 / Math.tan(Math.PI / 4))
  let contentRadius = Math.round(containerHeight / 2 / Math.tan(Math.PI / 4) + 70)
  
  for (var i = 0; i < sidebarCells.length; i++) {
    var cell = sidebarCells[i]
    var section = sectionCells[i]
    var content = sectionContent[i]
    if (i < 4) {
      // visible cell
      cell.style.opacity = 1
      var cellAngle = -90 * i 
      cell.style.transform =
        rotateFn + '(' + -cellAngle + 'deg) translateZ(' + cellRadius + 'px)'
      section.style.transform = 
        rotateFn + '(' + -cellAngle + 'deg) translateZ(' + sectionRadius + 'px)'
      content.style.transform = 
        rotateFn + '(' + -cellAngle + 'deg) translateZ(' + contentRadius + 'px)'
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
var controller = new ScrollMagic.Controller({
  container: '.sections-container',
})

//Timelines
var firstSectionTimeline = new TimelineMax()
  .fromTo(
    '.non-static',
    1,
    {
      // yoyoEase:true,
      rotationX: -180,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
    {
      // yoyoEase:true,
      rotationX: -90,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
  )
  .fromTo(
    '#content.home',
    .9,
    {
      // yoyoEase:true,
      autoAlpha: 1,
      z: '+=70'
    },
    {
      // yoyoEase:true,
      autoAlpha: 0,
      z: '-=70'
    },
    '-=.9'
  )
  .to(
    '#content.about-me',
    .9,
    {
      // yoyoEase:true,
      autoAlpha: 1,
      y: '+=70'
    },
    '-=.9'
  )
  .fromTo(
    '.about-me .section.shadow',
    1,
    {
      // yoyoEase:true,
      // transformOrigin: "50% 50% -50%"
      autoAlpha: 1
    },
    {
      // yoyoEase:true,
      // transformOrigin: "50% 50% -50%"
      autoAlpha: 0
    },
    '-=1'
  )

var secondSectionTimeline = new TimelineMax()
  .fromTo(
    '.non-static',
    1,
    {
      // yoyoEase:true,
      rotationX: -90,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
    {
      // yoyoEase:true,
      rotationX: 0,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
  )
  .to(
    '#content.about-me',
    .9,
    {
      // yoyoEase:true,
      autoAlpha: 0,
      y: '-=70'
    },
    '-=1'
  )

var thirdSectionTimeline = new TimelineMax()
  .fromTo(
    '.non-static',
    1,
    {
      // yoyoEase:true,
      rotationX: 0,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
    {
      // yoyoEase:true,
      rotationX: 90,
      // transformOrigin: "50% 50% -50%"
      // autoAlpha: 0,
    },
  )

var firstSection = new ScrollMagic.Scene({
  triggerElement: '.home.placeholder',
  duration: containerHeight,
  offset: -0.1,
  triggerHook: 0,
})
  .setTween(firstSectionTimeline)
  .addIndicators({
    name: 'triggerDown', // custom name for your scene
    indent: 520, // indent from the browser edge
    colorStart: 'transparent', // custom color - colorEnd
    colorEnd: 'transparent',
    colorTrigger: 'transparent',
  })
  .setPin('.non-static')
  .addTo(controller)

var secondSection = new ScrollMagic.Scene({
  triggerElement: '.about-me.placeholder',
  duration: containerHeight,
  offset: -0.1,
  triggerHook: 0,
})
  .setTween(secondSectionTimeline)
  .setPin('.non-static')
  .addTo(controller)

var thirdSection = new ScrollMagic.Scene({
  triggerElement: '.resume.placeholder',
  duration: containerHeight,
  offset: -0.1,
  triggerHook: 0,
})
  .setTween(thirdSectionTimeline)
  .setPin('.non-static', {pushfollowers: true})
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
