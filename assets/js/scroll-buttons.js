let sectionPositions = []
recalculateSectionPositions()

function recalculateSectionPositions() {
  console.log('Re-calculating section positions')

  const sections = [].slice.call(document.querySelectorAll('.section'))

  sectionPositions = sections.map(
    section => section.offsetTop
  )
}

function scheduleSectionPositionRecalculation() {
  window.requestAnimationFrame(recalculateSectionPositions)
}

window.addEventListener('resize', scheduleSectionPositionRecalculation)

function indexOfCurrentSection() {
  const scrollPosition = window.pageYOffset

  let i = 0
  while (scrollPosition >= sectionPositions[i] - (window.innerHeight / 2)) {
    i++
  }

  return i - 1
}

function indexOfPreviousSection() {
  return (
    (indexOfCurrentSection() - 1) %
    sectionPositions.length
  )
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
      top: sectionPosition
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

function scrollToProcessSection() {
  const sectionIndex = 4
  scrollToSectionIndex(sectionIndex)
}

function scrollToPortfolioSection() {
  const sectionIndex = 5
  scrollToSectionIndex(sectionIndex)
}

function scrollToLatestWorkSection() {
  const sectionIndex = 6
  scrollToSectionIndex(sectionIndex)
}

const scrollUpButton = document.querySelector('.scroll-up')
const scrollDownButton = document.querySelector('.scroll-down')
const homeButton = document.querySelector('.link.home')
const aboutMeButton = document.querySelector('.link.about-me')
const processButton = document.querySelector('.link.process')
const portfolioButton = document.querySelector('.link.portfolio')
const latestWorkButton = document.querySelector('.link.latest-work')
const linkUnderscore = document.querySelector('.link-underscore')

const homeUnderscorePosition = homeButton.getBoundingClientRect().left

scrollUpButton.addEventListener('click', scrollToPreviousSection)
scrollDownButton.addEventListener('click', scrollToNextSection)

homeButton.addEventListener('click', scrollToHomeSection)
aboutMeButton.addEventListener('click', scrollToAboutMeSection)
processButton.addEventListener('click', scrollToProcessSection)
portfolioButton.addEventListener('click', scrollToPortfolioSection)