const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const player = { name: 'Player', hand: [] };
const dealer = { name: 'Dealer', hand: [] };

// Build an 'original' deck of 'card' objects used to create shuffled decks
const originalDeck = buildOriginalDeck();
renderDeckInContainer(originalDeck, document.getElementById('original-deck-container'));

/*----- app's state (variables) -----*/

let firstDeal;
let shuffledDeck = getNewShuffledDeck();
// let playerContainer = document.getElementById('player-cards');
/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
// const dealerContainer = document.getElementById('dealer-cards');
// const playerCards = document.querySelector('.player-cards');
// const dealerCards = document.querySelector('.dealer-cards');
// const magic = document.querySelectorAll('.card-container .shuffled-deck-container .card')
player = document.querySelector('.player.cards');
dealer = document.querySelector('.dealer-cards');

// const dealCards = document.getElementById('player-cards');

/*----- event listeners -----*/
document.querySelector('#shuffle').addEventListener('click', renderNewShuffledDeck);


document.querySelector('#bet').addEventListener('click', firstDeal);
/*----- functions -----*/
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

function renderNewShuffledDeck() {
    // Create a copy of the originalDeck (leave originalDeck untouched!)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
        cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
        //   return html + `<div class="card ${card.face}"></div>`;
        // }, '');
        container.innerHTML = cardsHtml;
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
    
    renderNewShuffledDeck();

    // function firstDeal() {
    //     alert('hey');
    //     // Move two cards from the shuffled deck to the dealer hand
    //     dealer.hand.push(shuffledDeck.shift(), shuffledDeck.shift());
      
    //     // Render the dealer's cards
    //     renderHand(dealer.hand, dealerContainer);
    //   }
    // firstDeal();

    
    // shuffledContainer.forEach(function(card) {
    //     dealerCards.appendChild(card);
    // });
    // magic.forEach(function(card) {
    //     playerCards.appendChild(card);
    // });
    
// function firstDeal() {
//   // Deal two cards to player and dealer
//   player.hand.push(...shuffledDeck.splice(0, 2));
//   dealer.hand.push(...shuffledDeck.splice(0, 2));

//   // Render player's cards
//   renderDeckInContainer(player.hand, playerContainer);

//   // Render dealer's first card face-down
//   dealerContainer.innerHTML = `<div class="card back-blue"></div><div class="card ${dealer.hand[1].face}"></div>`;

    // function firstDeal() {
    //     // Remove the first two cards from shuffledDeck and add to player and dealer hands
    //     player.hand.push(shuffledDeck.shift());
    //     player.hand.push(shuffledDeck.shift());
    //     dealer.hand.push(shuffledDeck.shift());
    //     dealer.hand.push(shuffledDeck.shift());
      
    //     // Render player and dealer cards
    //     renderDeckInContainer(player.hand, playerContainer);
    //     renderDeckInContainer(dealer.hand, dealerContainer);
    //   }

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

// Define global variabl

function firstDeal() {
    // remove the "disabled" attribute from the "hit" and "stay" buttons
    document.querySelector("#hit").removeAttribute("disabled");
    document.querySelector("#stay").removeAttribute("disabled");
  
    // deal two cards to the dealer
    dealer.hand.push(...dealCards(2));
  
    // render the dealer's hand
    renderDeckInContainer(dealer.hand, document.querySelector(".dealer-cards"));
  }
  
  function dealCards(numCards) {
    const dealtCards = [];
    for (let i = 0; i < numCards; i++) {
      // get a random index for a card still in the shuffledDeck
      const rndIdx = Math.floor(Math.random() * shuffledDeck.length);
      // remove the card from the shuffledDeck and add it to dealtCards
      dealtCards.push(shuffledDeck.splice(rndIdx, 1)[0]);
    }
    return dealtCards;
  }
  
  function renderDeckInContainer(deck, container) {
    container.innerHTML = "";
    // Let's build the cards as a string of HTML
    let cardsHtml = "";
    deck.forEach(function (card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    container.innerHTML = cardsHtml;
  }