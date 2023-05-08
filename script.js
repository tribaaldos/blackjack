/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let deck;
let pHand;
let dHand;
/*----- cached element references -----*/


/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#bet').addEventListener('click', dealCards);
document.querySelector('#hit').addEventListener('click', botonHit);

/*----- functions -----*/
function dealCards() {
    // Shuffle the deck and reset player and dealer hands
    deck = getNewShuffledDeck();
    pHand = [];
    dHand = [];
  
    // Draw two cards from the shuffled deck and add them to the player's hand
    pHand.push(deck.shift());
    pHand.push(deck.shift());
  
    // Render the updated player's hand
    renderHands();
  }
  
  function renderHands() {
    // Display the cards in the player's hand
    const playerHandEl = document.getElementById('player-hand');
    playerHandEl.innerHTML = '';
    for (let i = 0; i < pHand.length; i++) {
      const card = pHand[i];
      const cardEl = document.createElement('div');
      cardEl.classList.add('card');
      cardEl.classList.add(card.face);
      playerHandEl.appendChild(cardEl);
    }
  }
  

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

// renderNewShuffledDeck();