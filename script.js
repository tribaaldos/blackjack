//CONSTANTS
const PLAYERS = {
    '0': '0',
    '1': 'X',
  };
//STATE VARIABLES

var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0
var yourAceCount = 0;

var hidden; 
var deck;

//CACHED ELEMENTS

//EVENT LISTENERS
// We need to create events for the buttons to play, to ask for another card
// to stay, or to divide or double the bet!

//FUNCTIONS
//0. Create a function to start with the money that the player wants and that u can 
// bet with the money that you set .

//1. Create function to generate a desk of cards, shuffle the cards and give a certain number 
// to every player.

//2. We need to calculate the value of every card that the player has and then 
// we need to determinate who will win with the rules of blackjack.
