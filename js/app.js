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

// Store the element which holds the moves in a variable
let movePanel = document.querySelector(".moves");
// Display de default moves on the page
movePanel.innerHTML = 0;
// Store the move counter in a variable
let moveCounter = 0;

// Store the element which holds the star rating in a variable
let starsPanel = document.querySelector(".stars");
// Add the HTML of the stars to the page, which at the beginning of a game displays 3 stars
let starItem = `<li><i class="fa fa-star"></i></li>`;
starsPanel.innerHTML = starItem + starItem + starItem;

// Store the element which holds the timer in a variable
let timePanel = document.querySelector(".timer");
// Display de default value of the timer on the page
timePanel.innerHTML = `00m:00s`;
// Store the time counter in a variable
let timeCounter = 0;
// Declare a timer identifier that can be used to cancel the execution
let timerId;
// The timer will start when the first card is clicked
let firstClick = true;

// Store the element which holds the popup in a variable
let popUp = document.querySelector(".popup");
// Declare a variable for Stars Wars power type based on rating
let powerType;

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
        // When the first card is clicked, start the timer
        if(firstClick) {
            beginTimer();
            // For the next clicks the condition will be false and the execution of the code will be skipped
            firstClick = false;
        }
        
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
                // Add animation to unmatched cards
                addUnmatchAnimation (openedCards);

                // Close opened cards and hide their symbol
                hideCards(openedCards);
                
                // Remove cards from opened cards array
                openedCards = [];

                // console.log("Cards don't match!");
            }

            // Increment the move counter and display it on the page
            countMoves();

        } else {
        // If opened cards array is empty  
            // Display card's symbol
            displaySymbol(cardItem);

            // Add opened card to a temporary array 
            addOpenArray(cardItem);
        }
    });
}

// Open card and display it's symbol and remove event listener
function displaySymbol(cardItem) {
    cardItem.classList.add("open", "show", "noclick");
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

// Add animation to unmatched cards
function addUnmatchAnimation (openedCards) {
    // Delay the execution of this code, to give time the second card to flip over 
    setTimeout(function() {
        // Play unmatched cards animation
        openedCards[1].classList.add("nomatch");
        openedCards[0].classList.add("nomatch");
    }, 400);
}

// Close opened cards and hide their symbol
function hideCards(openedCards) {
    // Delay the execution of this code, to give time to play unmatched cards animation
    setTimeout(function() {
        // Close cards, hide their symbol, add back event listener and remove animation for unmatched cards
        openedCards[1].classList.remove("open", "show", "noclick", "nomatch");
        openedCards[0].classList.remove("open", "show", "noclick", "nomatch");
    }, 1000);
}

// Increment the move counter and display it on the page
function countMoves() {
    moveCounter += 1;
    movePanel.innerHTML = moveCounter;
    // Display star rating based on player's moves
    showRating();
}

// Display star rating based on player's moves
function showRating() {
    switch(moveCounter) {
        // If number of moves >= 16, it changes to a 2 star rating
        case 16:
            starsPanel.innerHTML = starItem + starItem;
        break;
        // If number of moves >= 24, it changes to a 1 star rating
        case 24:
            starsPanel.innerHTML = starItem;
        break;
        // If number of moves >= 31, it changes to a 0 star rating
        case 31:
            starsPanel.innerHTML = "";
    }
}

// Check if all cards have matched
function gameOver() {
    // Check the length of the matched cards array
    if(matchedCards.length === 16) {
    //If all 8 card pairs have matched, end the game
        // Stop counting time
        endTimer();
        // Show game over message
        setTimeout(function() {
            showPopup();
        }, 100); 
    }
}

// Start the timer
function beginTimer() {
    timerId = setInterval(countTime, 1000);
}

// Increment the time counter
function countTime() {
    // Increase the time counter by 1
    timeCounter += 1;
    // Divide the timer into mm:ss format
    let min = Math.trunc(timeCounter/60);
    let sec = (timeCounter-(min*60));
    // If the minutes and seconds have 1 digit, add a 0 in front of it
    if (min < 10) {
        min = `0${min}m`;
    } else {
        min = `${min}m`;
    };
    if (sec < 10) {
        sec = `0${sec}s`;
    } else {
        sec = `${sec}s`;
    };
    // Update the timer HTML on the page
    timePanel.innerHTML = `${min}:${sec}`;
}

// Stop the timer when the game is over or the player resets the game
function endTimer() {
    clearInterval(timerId);
}

// Show congratulations popup
function showPopup() {
    switch(starsPanel.innerHTML) {
        // If number of stars = 3, the player has Death Star power
        case starItem + starItem + starItem:
            powerType = "Death Star";
        break;
        // If number of stars = 2, the player has Darth Vader power
        case starItem + starItem:
            powerType = "Darth Vader";
        break;
        // If number of stars = 1, the player has Stormtrooper power
        case starItem:
            powerType = "Storm Trooper";
        break;
        // If number of stars = 0, the player has no Sith power
        case ``:
            powerType = "No Sith";
        break;
    }

    // Make popup visible
    popUp.classList.add("visible");
    // Add HTML content of the modal to the page
    popUp.innerHTML = `<div class="modal"><h3>Congratulations! You won!</h3>
    <p>With ${moveCounter} Moves and ${starsPanel.innerHTML} Stars.<br>You have <em>${powerType}</em> power!</p>
    <button class="button" onclick='playAgain();'>Play again!</button></div>`;
}

// Restart game with play again button from the modal
function playAgain() {
    popUp.classList.remove("visible");
    resetVar();
    drawCards();
}

// Restart game with reset button
// Store the element which holds the reset button in a variable
let resetButton = document.querySelector(".restart");
// Add click event listener to reset button
resetButton.addEventListener("click", function() {
    // Reset all variables
    resetVar();
    // Initialize the game
    drawCards();
})

// Reset all variables
function resetVar() {
    // Reset shuffled cards array
    shuffledSymbols = shuffle(cardSymbols);
    // Delete cards HTML from the page
    cardBoard.innerHTML = "";
    // Delete cards from opened cards array
    openedCards = [];
    // Delete cards from matched cards array
    matchedCards = [];
    // Reset moves
    movePanel.innerHTML = 0;
    moveCounter = 0;
    // Reset rating
    starsPanel.innerHTML = starItem + starItem + starItem;
    // Reset timer
    endTimer();
    timePanel.innerHTML = `00m:00s`;
    timeCounter = 0;
    firstClick = true;
}

// Start game
drawCards();
