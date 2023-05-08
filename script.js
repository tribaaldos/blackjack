/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const playerCards = [];
const dealerCards = [];
const cards = [];
// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/

/*----- cached element references -----*/
const dealerCardsDiv = document.querySelector('.dealer-cards');
const playerCardsDiv = document.querySelector('.player-cards')
/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#bet').addEventListener('click', dealCards);
document.querySelector('#hit').addEventListener('click', botonHit);

/*----- functions -----*/
function init(){
  
  render();
}

// function dealCards() {
//   const hands = getNewShuffledDeck();
//   const cards = [];
//   for (let i = 0; i < 2; i++) {
//     cards.push(hands.pop());
//   }
//   dealerCardsDiv.innerHTML = cards.map(card => `<div class="card ${card.face}"></div>`).join('');
//   playerCardsDiv.innerHTML = cards.map(card => `<div class="card ${card.face}"></div>`).join('');
//   console.log(dealerCardsDiv)
//   };
  
function dealCards() {
  const hands = getNewShuffledDeck();
  dealerCards.push(hands.pop()), dealerCards.push(hands.pop());
  playerCards.push(hands.pop()), playerCards.push(hands.pop());
  dealCards
  dealerCardsDiv.innerHTML = dealerCards.map(card => `<div class="card ${card.face}"></div>`).join('');
  playerCardsDiv.innerHTML = playerCards.map(card => `<div class="card ${card.face}"></div>`).join('');
  console.log('Dealer cards:', dealerCards);
  console.log('Player cards:', playerCards);
};
// for (let i = 0; i < 4; i++) {
//   if (i % 2 === 0) {
//     dealerCards.push(hands.pop());
//   } else {
//     playerCards.push(hands.pop());
//   }


function botonHit() {

}









function getNewShuffledDeck() {
  // Create a copy of the originalDeck (leave originalDeck untouched!)
  const tempDeck = [...originalDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}




function buildOriginalDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}