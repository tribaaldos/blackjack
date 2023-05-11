/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const dealerMessages = ['Dealer wins', 'Dealer above 21, YOU WIN!', 'Tie', 'Blackjack']
const playerMessages = ['Player wins', 'Player above 21, DEALERS WINS', 'Tie', 'Blackjack']
// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();

/*----- app's state (variables) -----*/
let playerCards;
let dealerCards;
let cards;
let hands;
let playerCardsSum;
let dealerCardsSum;
let stay;
let bank;
let bet;
/*----- cached element references -----*/
const dealer_cards_div = document.querySelector('.dealer-cards');
const player_cards_div = document.querySelector('.player-cards');
const number_player = document.querySelector('.number-player')
const number_dealer = document.querySelector('.number-dealer')
const bet_button = document.querySelector('#bet');
const hide_button = document.getElementById('bet');
const p = document.querySelector('.log');
const bankEl = document.querySelector('.banklog');
const betEl = document.querySelector('.betlog');

/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);
document.querySelector('#bet').addEventListener('click', handleBet);
document.querySelector('#hit').addEventListener('click', botonHit);
document.querySelector('#stay').addEventListener('click', handleStand);
document.querySelector('#bet').addEventListener('click', hideButton);
document.querySelector('.monedas').addEventListener('click', handleAllChips);
//------remove Event Listeners


/*----- functions -----*/
function init(){
  playerCards = [];
  dealerCards = [];
  cards = [];
  hands = getNewShuffledDeck();
  playerCardsSum = 0;
  dealerCardsSum = 0;
  stay = false;
  
  document.querySelector('#stay').style.visibility = 'hidden';
  document.querySelector('#hit').style.visibility = 'hidden';
  bank = 1000;
  bet = 0;
  // render();
}
init();
function render() {
  //show dealer cards
  dealer_cards_div.innerHTML = dealerCards.map((card, index) => {
    if (index === 0) {
      if (stay) { 
        return `<img class="card ${card.face}"></div>`     
      } else { 
        return `<div class="card back"></div>`;
      }
    } else {
      return `<img class="card ${card.face}"></div>`;
    }
  }).join('');
  
  // dealer cards but number
  if (dealerCards.length > 0) {
    if (stay) number_dealer.innerHTML = dealerCardsSum
    else number_dealer.innerHTML = dealerCards[1].value;
  }
  
  // player cards number
  number_player.innerHTML = playerCardsSum;
  player_cards_div.innerHTML = playerCards.map(card => `<img class="card ${card.face}"></div>`).join('');
  bankEl.innerHTML = bank;
  betEl.innerHTML = bet;
  
}
function handleAllChips(evt) {
  const amt = parseInt(evt.target.innerText);
  if (amt > bank) return
  bank -= amt;
  bet += amt;
  render();
}
function handleBet() {

  dealerCards.push(hands.pop(), hands.pop());
  playerCards.push(hands.pop(), hands.pop()); 
  playerCardsSum = getHandTotal(playerCards);
  dealerCardsSum = getHandTotal(dealerCards);
  render();
  checkforBlackjack();
  // dealer-cards.innerHTML = ` <img class="card back">
  // <img class="card back">`;
};  


function botonHit() {
  
  if (playerCardsSum < 21) {
    playerCards.push(hands.pop());  
  } else if (playerCardsSum === 21) {
    document.querySelector('hit').style.visibilty = 'hidden';
  }
  playerCardsSum = getHandTotal(playerCards); 
  render();
  checkLoser();
}
function handleStand() {
  stay = true
  document.querySelector('#hit').disabled = true;
  while (dealerCardsSum < 17) {
    dealerCards.push(hands.pop());
    dealerCardsSum = getHandTotal(dealerCards); 
  }
  document.querySelector('#stay').style.visibility = 'hidden';
  document.querySelector('#hit').style.visibility = 'hidden';
  document.querySelector('#bet').style.visibility = 'visible';
  checkWinner();
  render();
}

function getHandTotal(hand) {
  let total = 0;
  let aces = 0;
  hand.forEach(function(card) {
    total += card.value;
    if (card.value === 11) aces++;
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  } 
  return total;
}
function hideButton() {
  // hide_button.style.display = "none";
  document.querySelector('#bet').style.visibility = 'hidden';
  document.querySelector('#stay').style.visibility = 'visible';
  document.querySelector('#hit').style.visibility = 'visible';
}
function checkLoser() {
  if (playerCardsSum > 21) {
    p.innerHTML = playerMessages[1];
  }
}
function checkforBlackjack(){
  dealerCardsSum = getHandTotal(dealerCards);
  if (playerCardsSum === 21) {
    p.innerHTML = 'Player blackjack';
  } 
  else if (dealerCardsSum === 21) {
    p.innerHTML = 'Dealer Blackjack'
  }
}
function checkWinner() {
  // player
  if (playerCardsSum > 21) {
    p.innerHTML = playerMessages[1];
  } else if (playerCardsSum > dealerCardsSum) {
    p.innerHTML = playerMessages[0];
    bank += bet * 2; 
  }
  // dealer
  else if (dealerCardsSum > 21) {
    p.innerHTML = dealerMessages[1];
    bank += bet *2;
  } else if (dealerCardsSum > playerCardsSum) {
    p.innerHTML = dealerMessages[0];
    
  } else if (dealerCardsSum === playerCardsSum) {
    p.innerHTML = 'PUSH';
    bank += bet; 
  } else {
    p.innerHTML = dealerMessages[2];
  }
  bet = 0; 
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


//GUIDE LINE
            
// 1. Create a deck of cards with values from 2-10, J, Q, K, A
// 2. Shuffle the deck of cards
// 3. Deal two cards to the player and two cards to the dealer
// 4. Determine the total value of the player's cards and display it
// 5. Determine the total value of the dealer's cards and display one card face up
// 6. Allow the player to hit or stand
// 7. If the player chooses to hit, deal another card and add its value to the player's total
// 8. If the player chooses to stand, end their turn
// 9. If the player's total exceeds 21, they bust and lose the game
// 10. If the player's total is 21, they win the game
// 11. If the player stands, the dealer's turn begins
// 12. The dealer hits until their total is at least 17
// 13. If the dealer's total exceeds 21, they bust and the player wins
// 14. If the dealer's total is greater than the player's total without exceeding 21, the dealer wins
// 15. If the dealer's total is less than or equal to the player's total without exceeding 21, the player wins
// 16. Allow the player to play again or quit the game
