var ctx;
var dpr;
const twoPi = Math.PI * 2;
var width;
var height;
var times = [];
var canvas;
const fadeDuration = 300; // in seconds
const interval = 100; // in ms
const diameter = 1; // in px
const radius = diameter / 2; // in px

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
  times.unshift(moment());
  var nPoints = fadeDuration * (1000/interval);
  times = times.slice (0, nPoints);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i=0; i<times.length; i++) {
    let opacity = 1-(i / (nPoints));
    drawPoint(times[i], opacity);
  }
}

function drawPoint(time, opacity) {
  var seconds = time.seconds();
  var milliseconds = time.milliseconds();
  var ySpace = height/1000;
  var y = (milliseconds * ySpace) + (ySpace / 2);
  var y2 = Math.round(2 * y);
  var yTranslate = y2/2 + ((y2 % 2 ) == (diameter % 2) ? 0 : 0.5);

  var xSpace = width / 60;
  var x = (seconds * xSpace) + (xSpace / 2);
  var x2 = Math.round(2 * x);
  var xTranslate = x2/2 + ((x2 % 2) == (diameter % 2) ? 0 : 0.5);

  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

  ctx.save();
  ctx.translate(xTranslate, yTranslate);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, twoPi);
  ctx.fill();
  ctx.restore();
}
