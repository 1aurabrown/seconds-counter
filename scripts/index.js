var ctx;
var start = moment();
var dpr;
var radius = 1;
const twoPi = Math.PI * 2;
var width;
var height;
var interval = 1000;
var times = []
$(document).ready( function() {
  dpr = window.devicePixelRatio || 1;
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  ctx.webkitImageSmoothingEnabled = true;
  ctx.imageSmoothingEnabled = true;

  // resize the canvas to fill browser window dynamically
  // window.addEventListener('resize', resizeCanvas, false);

  resizeCanvas();
  window.setInterval(function() {
    window.requestAnimationFrame(draw);
  }, interval)

});

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width;
  canvas.style.height = height;

  ctx.scale(dpr, dpr);

  /**
   * Your drawings need to be inside this function otherwise they will be reset when
   * you resize the browser window and the canvas goes will be cleared.
   */
}


function draw() {
  times.unshift(moment())
  nPoints = 60 * (1000/interval)
  arrayLength = nPoints * 2
  times = times.slice (0, arrayLength)

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (i=0; i<times.length; i++) {
    opacity = 1-(i / (arrayLength))
    console.log(opacity)
    drawPoint(times[i], opacity)
  }
}

function drawPoint(time) {
  console.log(time)
  var seconds = time.seconds()
  var milliseconds = time.milliseconds()
  var yTranslate = milliseconds * height/1000
  var xSpace = width / 60;
  var xTranslate = seconds * xSpace

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

  ctx.save();
  ctx.translate(xTranslate, yTranslate);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, twoPi);
  ctx.fill();
  ctx.restore();
}
