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

// Store the first .deck element in a variable, where will be added each card's HTML
let cardBoard = document.querySelector(".deck");

// Store the opened cards in an empty array
let openedCards = [];

// Store the matched cards in a temporary array
let matchedCards = [];


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
        let cardItem = document.createElement("li");
        cardItem.classList.add("card");
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

// Add click event listener for card
function clickCard(cardItem) {
    cardItem.addEventListener("click", function() {
        // Check if the opened cards array already has another card
        if(openedCards.length === 1) {
        // If opened cards array has another card
            // Display card's symbol
            displaySymbol(cardItem);

            // Add opened card to a temporary array 
            addOpenArray(cardItem);

            // Check cards for match
            if(openedCards[1].innerHTML === openedCards[0].innerHTML) {
            // If the cards do match
                // Lock the cards in open position
                lockCards(openedCards);

                // Push cards to matched cards array
                addMatchArray(openedCards);

                // Remove cards from opened cards array
                openedCards = [];

                // Check if all cards have matched
                gameOver();
                                
                // console.log("Cards match!");

            } else {
            // If the cards don't match
                // Close opened cards and hide their symbol
                hideCards(openedCards);
                
                // Remove cards from opened cards array
                openedCards = [];

                // console.log("Cards don't match!");
            }

        } else {
        // If opened cards array is empty  
            // Display card's symbol
            displaySymbol(cardItem);

            // Add opened card to a temporary array 
            addOpenArray(cardItem);
        }
    });
}

// Open card and display it's symbol
function displaySymbol(cardItem) {
    cardItem.classList.add("open", "show");
}

// Store opened card in a temporary empty array
function addOpenArray(cardItem) {
    openedCards.push(cardItem);
}

// Lock the cards in open position
function lockCards(openedCards) {
    openedCards[1].classList.add("match");
    openedCards[0].classList.add("match"); 
}

// Store matched cards in a temporary array
function addMatchArray(openedCards) {
    matchedCards.push(openedCards[0], openedCards[1]);
}

// Close opened cards and hide their symbol
function hideCards(openedCards) {
    // Delay the execution of this code
    setTimeout(function() {
        openedCards[1].classList.remove("open", "show");
        openedCards[0].classList.remove("open", "show");
    }, 400);
}

// Check if all cards have matched
function gameOver() {
    // Check the length of the matched cards array
    if(matchedCards.length === cardSymbols.length) {
    //If all 8 card pairs have matched, end the game
        // Show game over message
        setTimeout(function() {
            alert("GAME OVER!");
        }, 100);
    }
}

// Start game
drawCards();
