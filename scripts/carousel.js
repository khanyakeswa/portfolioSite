var carousel = document.querySelector('.carousel')
var cells = carousel.querySelectorAll('.carousel-cell')
var cellCount // cellCount set from cells-range input value
var selectedIndex = 0
var selectedArray = [0, 1, 2, 3]
var cellWidth = carousel.offsetWidth
var cellHeight = carousel.offsetHeight
var isHorizontal = false
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
  cellCount = 4
  var cellSize = isHorizontal ? cellWidth : cellHeight
  radius = Math.round(cellSize / 2 / Math.tan(Math.PI / cellCount))
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i]
    if (i < cellCount) {
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
  isHorizontal = false
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
  }, 1000)
}

advanceCarousel()
