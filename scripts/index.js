var ctx;
var start = moment();
var dpr;
var radius = .2;
const twoPi = Math.PI * 2;
var width;
var height;
var interval = 100;

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
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  var time = moment()
  var seconds = time.seconds()
  var milliseconds = time.milliseconds()
  var yTranslate = milliseconds * height/1000
  var xSpace = width / 60;
  var xTranslate = seconds * xSpace
  ctx.save();
  ctx.translate(xTranslate, yTranslate);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, twoPi);
  ctx.stroke();
  ctx.restore();
}
