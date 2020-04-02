const navbar = document.querySelector('.navbar', '.portfolio-button')
const colorBarHeight = document.getElementsByClassName('color-bar');

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
