'use strict';

{
  let DRAW_OFFSET = 32;
  let CARD_IMAGE_WIDTH = 75;
  let CARD_IMAGE_HEIGHT = 125;
  let X_LINE = 4, Y_LINE = 14;
  
  let CANVAS_WIDTH = CARD_IMAGE_WIDTH * X_LINE + DRAW_OFFSET * 2;
  let CANVAS_HEIGHT = CARD_IMAGE_HEIGHT * Y_LINE + DRAW_OFFSET * 2 ;
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
        image.src = eval("card_" + suitChar[i] + (num <= 9 ? "0" + num : num));
        cardImages.push(image)
      }
    }
  })();
  let cardToImageIndex = function(card) {
    return (card.suit - 1) * placecards.Deck.NUMBER_MAX + card.num;
  }

  let cardCount = 0;
  let frameCount = 0;
  let placedCard = [];

  let context = canvas.getContext('2d');
  setInterval(function() {
    context.fillStyle = 'rgba(0, 0, 0, 255)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < Y_LINE; ++y) {
      for (let x = 0; x < X_LINE; ++x) {
        let count = (y * X_LINE + x);
        if (cardCount > count) {
          let cardImage = cardImages[cardToImageIndex(placedCard[count])];
          context.drawImage(cardImage, 
            DRAW_OFFSET + x * CARD_IMAGE_WIDTH, DRAW_OFFSET + y * CARD_IMAGE_HEIGHT, 
            CARD_IMAGE_WIDTH, CARD_IMAGE_HEIGHT);
        } else {
          break;
        }
      }
    }
    if (++frameCount > 60) {
      let nextCard = deck.popCard();
      if (typeof nextCard !== "undefined") {
        placedCard.push(nextCard);
        ++cardCount;
        frameCount = 0;
      }
    }
  }, 1000 / 60);
}
