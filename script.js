/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const dealerMessages = ['Dealer wins', 'Dealer above 21, lose', 'Tie', 'Blackjack']
const playerMessages = ['Player wins', 'Player above 21, lose', 'Tie', 'Blackjack']
// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let playerCards;
let dealerCards;
let cards;
let hands;
let playerCardsSum;
let dealerCardsSum;

/*----- cached element references -----*/
const dealer_cards_div = document.querySelector('.dealer-cards');
const player_cards_div = document.querySelector('.player-cards');
const number_player = document.querySelector('.number-player')
const number_dealer = document.querySelector('.number-dealer')
const bet_button = document.querySelector('#bet');
const hide_button = document.getElementById('bet');
const p = document.querySelector('.log');

/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#bet').addEventListener('click', dealCards);
document.querySelector('#hit').addEventListener('click', botonHit);
document.querySelector('#stay').addEventListener('click', handleStand);
document.querySelector('#bet').addEventListener('click', hideButton);

//------remove Event Listeners


/*----- functions -----*/
function init(){
  playerCards = [];
  dealerCards = [];
  cards = [];
  hands = getNewShuffledDeck();
  playerCardsSum = 0;
  dealerCardsSum = 0;
  // dealCards();
  
}
init();
function render() {
  //show cards
  dealer_cards_div.innerHTML = dealerCards.map(card => `<img class="card ${card.face}"></div>`).join('');
  player_cards_div.innerHTML = playerCards.map(card => `<img class="card ${card.face}"></div>`).join('');
  // show number of the value of all the cards
  //number of player cards

  number_player.innerHTML = playerCardsSum;
  number_dealer.innerHTML = dealerCardsSum;
  checkWinner();
}

function dealCards() {

  dealerCards.push(hands.pop(), hands.pop());
  playerCards.push(hands.pop(), hands.pop()); 
  playerCards.forEach(card => playerCardsSum += card.value);
  dealerCards.forEach(card => dealerCardsSum += card.value);
  render();
};  

function hideButton() {
  hide_button.style.display = "none";
}

function botonHit() {
  
  if (playerCardsSum < 21) {
    playerCards.push(hands.pop());  
  } 
  playerCardsSum = 0; 
  playerCards.forEach(card => playerCardsSum += card.value);
  render();
}
function handleStand() {

    while (dealerCardsSum < 17) {
      dealerCards.push(hands.pop());
      dealerCardsSum = 0; // Reset the sum to recalculate it correctly
      dealerCards.forEach(card => dealerCardsSum += card.value); // Recalculate the sum
    }
  render();
}
function checkWinner() {
  //player
  if (playerCardsSum === 21) {
    p.innerHTML = playerMessages[3]
  } else if (playerCardsSum > 21) {
    p.innerHTML = playerMessages[1]
  } else if (playerCardsSum > dealerCardsSum) {
    p.innerHTML = playerMessages[0];
  }
  //dealer
  else if (dealerCardsSum === 21) {
    p.innerHTML = dealerMessages[3];
  } else if (dealerCardsSum > 21) {
    p.innerHTML = dealerMessages[1];
  } else if (dealerCardsSum > playerCardsSum) {
    p.innerHTML = dealerMessages[0];
  } else {
    dealerMessages[2];
  }

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
        value: Number(rank) || (rank === 'A' ? 11 && 1 : 10)
      });
    });
  });
  return deck;
}