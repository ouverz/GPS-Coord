// (function() {
//     //var canvas = document.getElementById('c'),
//       //  cxt = canvas.getContext('2d'),
//         downloadLink = document.getElementById('download-canvas');

//     //downloadLink.href = canvas.toDataURL();
//     downloadLink.download = "squares.png";
// })();


createLink = function(name) {
  var canvas, cxt, downloadLink;

  canvas = document.getElementById('myCanvas');
  cxt = canvas.getContext('2d');
  downloadLink = document.getElementById('download');
  downloadLink.href = canvas.toDataURL();
  return downloadLink.download = "" + name + ".png";
};