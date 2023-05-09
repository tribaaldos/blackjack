/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let playerCards;
let dealerCards;
let cards;
let hands;

/*----- cached element references -----*/
const dealer_cards_div = document.querySelector('.dealer-cards');
const player_cards_div = document.querySelector('.player-cards')
const bet_button = document.querySelector('#bet')
const hide_button = document.getElementById('bet')

/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#bet').addEventListener('click', dealCards);
document.querySelector('#hit').addEventListener('click', botonHit);
document.querySelector('#bet').addEventListener('click', hideButton);

//------remove Event Listeners


/*----- functions -----*/
function init(){
  playerCards = [];
  dealerCards = [];
  cards = [];
  hands = getNewShuffledDeck();
  // dealCards();
  
}
init();
function render() {
  dealer_cards_div.innerHTML = dealerCards.map(card => `<img class="card ${card.face}"></div>`).join('');
  player_cards_div.innerHTML = playerCards.map(card => `<img class="card ${card.face}"></div>`).join('');
}

function dealCards() {

  dealerCards.push(hands.pop(), hands.pop());
  playerCards.push(hands.pop(), hands.pop()); 
  
  render();
};  

function hideButton() {
  hide_button.style.display = "none";
}


function botonHit() {
  
  let dealerCardsSum = 0;
  let playerCardsSum = 0;

  dealerCards.forEach(card => dealerCardsSum += card.value); 
  playerCards.forEach(card => playerCardsSum += card.value);

 if (playerCardsSum < 21) {
  playerCards.push(hands.pop());

} else if (playerCardsSum > 21) {
  playerCardsSum += playerCards[playerCards.length - 1].value;
  console.log(playerCardsSum, 'NOOOO :(! player above 21');
} 
  while (dealerCardsSum < 16) { 
    dealerCards.push(hands.pop());
    dealerCardsSum += dealerCards[dealerCards.length - 1].value;
} 
  if (dealerCardsSum > 21) {
    console.log('Dealer loses!');
  }

  render();
}




//CSS--LIBRARY--

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