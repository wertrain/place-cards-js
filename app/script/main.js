'use strict';

{
  let CANVAS_WIDTH = 640;
  let CANVAS_HEIGHT = 480;
  let CANVAS_ID = 'canvas';
  
  let canvas = document.getElementById(CANVAS_ID);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let context = canvas.getContext('2d');
    (function() {
      context.fillStyle = 'rgba(0, 0, 0, 255)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      setTimeout(arguments.callee, 1000 / 60);
  })();

  let deck = new placecards.Deck();
  deck.shuffle();
  console.log(deck.popCard().suit);
}
