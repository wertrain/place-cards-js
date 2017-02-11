'use strict';

{
  let CANVAS_WIDTH = 640;
  let CANVAS_HEIGHT = 480;
  let CANVAS_ID = 'canvas';
  
  let canvas = document.getElementById(CANVAS_ID);
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  let deck = new placecards.Deck();
  deck.shuffle();
  
  let cardImages = [];
  (function() {
    let suitChar = ['s', 'd', 'h', 'c'];
    for (let i = 0; i < suitChar.length; ++i) {
      for (let j = 0; j < placecards.Deck.NUMBER_MAX; ++j) {
        let image = new Image();
        let num = j + 1;
        image.src = eval("card_" + suitChar[i] + (num <= 9 ? "0" + num : num))
        cardImages.push(image)
      }
    }
  })();
  let cardToImageIndex = function(card) {
    return (card.suit - 1) * placecards.Deck.NUMBER_MAX + card.num;
  }
  
  let context = canvas.getContext('2d');
  (function() {
    context.fillStyle = 'rgba(0, 0, 0, 255)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(cardImages[0], 0, 0, 100, 150);
    //setTimeout(arguments.callee, 1000 / 60);
  })();
}
