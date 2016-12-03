/*
	Starfield lets you take a div and turn it into a starfield.

*/

//	Define the starfield class.
function Starfield () {
  this.fps = 30
  this.canvas = null
  this.width = 0
  this.height = 0
  this.minVelocity = 15
  this.maxVelocity = 30
  this.stars = 100
  this.intervalId = 0
  this.minDiameter = 1
  this.maxDiameter = 4
  this.backgroundColor = '#000000'
  this.colors = require('nice-color-palettes')[5]
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function (div) {
  var self = this

  //	Store the div.
  this.containerDiv = div
  self.width = window.innerWidth
  self.height = window.innerHeight

  window.addEventListener('resize', function resize (event) {
    self.width = window.innerWidth
    self.height = window.innerHeight
    self.canvas.width = self.width
    self.canvas.height = self.height
    self.draw()
  })

  //	Create the canvas.
  var canvas = document.createElement('canvas')
  div.appendChild(canvas)
  this.canvas = canvas
  this.canvas.width = this.width
  this.canvas.height = this.height
}

Starfield.prototype.start = function () {
  //	Create the stars.
  var stars = []
  for (var i = 0; i < this.stars; i++) {
    stars[i] = new Star(
      Math.random() * this.width,
      Math.random() * this.height,
      Math.random() * (this.maxDiameter - 1) + this.minDiameter,
      (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity,
      this.colors[Math.floor(Math.random() * this.colors.length)]
    )
  }
  this.stars = stars

  var self = this
  //	Start the timer.
  this.intervalId = setInterval(function () {
    self.update()
    self.draw()
  }, 1000 / this.fps)
}

Starfield.prototype.stop = function () {
  clearInterval(this.intervalId)
}

Starfield.prototype.update = function () {
  var dt = 1 / this.fps

  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i]
    star.y += dt * star.velocity
    //	If the star has moved from the bottom of the screen, spawn it at the top.
    if (star.y > this.height) {
      this.stars[i] = new Star(
        Math.random() * this.width,
        0,
        Math.random() * (this.maxDiameter - 1) + this.minDiameter,
        (Math.random() * (this.maxVelocity - this.minVelocity)) + this.minVelocity,
        this.colors[Math.floor(Math.random() * this.colors.length)]
      )
    }
  }
}

Starfield.prototype.draw = function () {
  //	Get the drawing context.
  var ctx = this.canvas.getContext('2d')

  //	Draw the background.
  ctx.fillStyle = this.backgroundColor
  ctx.fillRect(0, 0, this.width, this.height)

  //	Draw stars.
  for (var i = 0; i < this.stars.length;i++) {
    var star = this.stars[i]
    ctx.fillStyle = star.color
    ctx.strokeStyle = '#FFFF00'
    polygon(ctx, star.x, star.y, star.size, 6, Math.PI/2)
  }
}

function polygon (ctx, x, y, radius, sides, startAngle, anticlockwise) {
  if (sides < 3) return
  var a = (Math.PI * 2) / sides
  a = anticlockwise ? -a : a
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(startAngle || 0)
  ctx.moveTo(radius, 0)
  ctx.beginPath()
  for (var i = 1; i <= sides; i++) {
    ctx.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i))
  }
  ctx.closePath()
  ctx.fill()
  // ctx.stroke()
  ctx.restore()
}

function Star (x, y, size, velocity, color) {
  this.x = x
  this.y = y
  this.size = size
  this.velocity = velocity
  this.color = color
}
