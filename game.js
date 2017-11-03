var Game = (function () {

    function Game(balance, shuffleNow) {
        this.player = new Player(balance);
        this.deck = new Deck(shuffleNow);
        this.hand = new Hand();
        this.newHand = true;
        this.cardImages = document.getElementById("cards-div").children;
        console.log(this.cardImages);
    }

    Game.prototype.setUp = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betInput = document.getElementById("bet-input");

        dealBtn.addEventListener("click", () => {
            betInput.setAttribute("disabled", "true");
            betInput.title = "";
            this.deal();
        });

        betInput.addEventListener("click", function () {
            if(betInput.value > 0) {
                dealBtn.classList.remove("disabled");
                dealBtn.title = "";
            }
        });

        for(let i = 0; i < this.cardImages.length; i++) {
            this.cardImages[i].addEventListener("click", () => {
                this.hold(this.cardImages[i], this.newHand);
            });
        }
    };

    Game.prototype.deal = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betInput = document.getElementById("bet-input");
        let notification = document.getElementById("hand-outcome-notif")
        notification.classList.remove("alert", "alert-danger");
        notification.textContent = "GOOD LUCK"        

        if(this.newHand) { // this is a new hand

            if(betInput.value < 1) {
                notification.textContent = "PLEASE ENTER A POSITIVE BET VALUE."
                notification.classList.add("alert", "alert-danger");
                betInput.removeAttribute("disabled");
                return; 
            }
            else if(betInput.value > 50) {
                notification.textContent = "PLEASE ENTER A BET UNDER 50 CREDITS."
                notification.classList.add("alert", "alert-danger");
                betInput.removeAttribute("disabled");                
                return;            
            }
            this.player.updateAccount(-betInput.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(this.deck.deal(5));
            console.log(this.hand);

            dealBtn.textContent = "DRAW";

            for(let i = 0; i < this.cardImages.length; i++) {
                // remove the .hold class from any cards that have it applied
                this.cardImages[i].classList.remove("hold");

                // update card images
                this.cardImages[i].src=`img/${this.hand.cards[i].name}.png`;
            }

            this.newHand = false;
        }
        else { // this is not a new hand

            for(let i = 0; i < this.cardImages.length; i++) {
                // for each card that was not held,
                if(!this.cardImages[i].classList.contains("hold")) {                    

                    // replace the card not held with a new card dealt from the deck,
                    this.hand.cards.splice(i, 1, this.deck.deal(1)[0]);
                    
                    // and display the new card to the screen.
                    this.cardImages[i].src=`img/${this.hand.cards[i].name}.png`;
                }
            }


            let bestHand = this.hand.getBestHand();

            notification.textContent = bestHand.handType;
            this.player.updateAccount(betInput.value * bestHand.multiplier);

            dealBtn.textContent = "DEAL";
            betInput.removeAttribute("disabled");
            this.newHand = true;
        }

        // calculate winnings

        // update the player account

    }

    Game.prototype.hold = function(card, newHand) { // card should be the CSS ID of the image that should be held
        if(!newHand) {
            card.classList.toggle("hold");
        }
    };

    return Game;
	
})();