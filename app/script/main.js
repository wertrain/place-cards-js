'use strict';

{
  let deck = new placecards.Deck();
  deck.shuffle();
  console.log(deck.popCard().suit);
}
