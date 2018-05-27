/*
 * Create a list that holds all of your cards
 */

 let cardSymbols = ["sym sym-C3PO", "sym sym-C3PO", "sym sym-Chewbacca", "sym sym-Chewbacca", "sym sym-Darth-Vader", "sym sym-Darth-Vader", "sym sym-Death-Star", "sym sym-Death-Star", "sym sym-Leia", "sym sym-Leia", "sym sym-Millennium-Falcon", "sym sym-Millennium-Falcon", "sym sym-R2D2", "sym sym-R2D2", "sym sym-Stormtrooper", "sym sym-Stormtrooper"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//  Store shuffled cards array in a new array
let shuffledSymbols = shuffle(cardSymbols);
// console.log(shuffledSymbols);

// Store the first .deck element in a variable, where each card's HTML will be added
let cardBoard = document.querySelector('.deck');

// Store the opened cards in an empty array
let openedCards = [];



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initialize game
function drawCards() {
    // Loop through each card item
    for (i = 0; i < shuffledSymbols.length; i++) {
        // Create card's HTML and add CSS class
        let cardItem = document.createElement('li');
        cardItem.classList.add('card');
        cardItem.innerHTML = `<i class="${shuffledSymbols[i]}"></i>`;
        // Add each card's HTML to the page
        cardBoard.appendChild(cardItem);
        // Add click event for each card
        clickCard(cardItem);
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Add event listener for card
function clickCard(cardItem) {
    cardItem.addEventListener('click', function() {
        // Display card's symbol
        displaySymbol(cardItem);
        // Add opened card to a temporary array 
        addTempArray(cardItem);
    });
}

// Open card and display it's symbol
function displaySymbol(cardItem) {
    cardItem.classList.add("open", "show");
}

// Store opened card in an empty array
function addTempArray(cardItem) {
    openedCards.push(cardItem);
}

function compareCards() {
    if(openedCards === 1) {

    }
}

// Start game
 drawCards();