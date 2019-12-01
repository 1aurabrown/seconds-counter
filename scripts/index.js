var ctx;
const start = moment();
var dpr;
const twoPi = Math.PI * 2;
var width;
var height;
var times = []
const params = $.deparam(window.location.search.split('?')[1] || '')
const fadeDuration = parseInt(params.fadeDuration) ? params.fadeDuration : 300; // in seconds
const interval = parseInt(params.interval) ? params.interval : 100; // in ms
const radius = parseInt(params.radius) ? params.radius : 1; // in px
const reloadInterval = parseInt(params.reloadInterval) // in minutes, optionally refresh the page

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
  if (reloadInterval && reloadInterval > 0) {
    window.setInterval(function() {
      location.reload()
    }, reloadInterval * 1000)
  }
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
  nPoints = fadeDuration * (1000/interval)
  times = times.slice (0, nPoints)

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (i=0; i<times.length; i++) {
    opacity = 1-(i / (nPoints))
    drawPoint(times[i], opacity)
  }
}

function drawPoint(time, opacity) {
  var seconds = time.seconds()
  var milliseconds = time.milliseconds()
  var ySpace = height/1000
  var yTranslate = (milliseconds * ySpace) + (ySpace / 2)
  var xSpace = width / 60;
  var xTranslate = (seconds * xSpace) + (xSpace / 2)

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

  ctx.save();
  ctx.translate(xTranslate, yTranslate);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, twoPi);
  ctx.fill();
  ctx.restore();
}
