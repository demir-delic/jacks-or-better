var Game = (function () {

    function Game(balance, shuffleNow) {
        this.player = new Player(balance);
        this.deck = new Deck(shuffleNow);
        this.hand = new Hand();
        this.newHand = true;
        this.cardImages = document.getElementById("cards-div").children;
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
        this.deck = new Deck(true);
        let dealBtn = document.getElementById("deal-btn");
        let betInput = document.getElementById("bet-input");
        let notification = document.getElementById("hand-outcome-notif")
        notification.classList.remove("alert", "alert-danger");
        notification.textContent = "GOOD LUCK"        
        
        if(this.newHand) { // this is a new hand

            if(betInput.value < 1 || betInput.value > 50) {
                notification.classList.add("alert", "alert-danger");
                betInput.removeAttribute("disabled");

                if(betInput.value < 1) { notification.textContent = "PLEASE ENTER A POSITIVE BET VALUE" }                
                if(betInput.value > 50) { notification.textContent = "PLEASE ENTER A BET UNDER 50 CREDITS" }

                return; 
            }

            this.player.updateAccount(-betInput.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(this.deck.deal(5));

            for(let i = 0; i < this.cardImages.length; i++) {
                // remove the .hold class from any cards that have it applied
                this.cardImages[i].classList.remove("hold");

                // update card images
                this.cardImages[i].src=`img/${this.hand.cards[i].name}.png`;
            }

            dealBtn.textContent = "DRAW";  
            this.newHand = false;
        }
        else { // 

            for(let i = 0; i < this.cardImages.length; i++) {
                // for each card that was not held,
                if(!this.cardImages[i].classList.contains("hold")) {                    

                    // replace the card not held with a new card dealt from the deck,
                    this.hand.cards.splice(i, 1, this.deck.deal(1)[0]);
                    
                    // and display the new card image
                    this.cardImages[i].src=`img/${this.hand.cards[i].name}.png`;
                }
            }

            // determine the player's winnings based off of their hand
            let bestHand = this.hand.getBestHand();

            notification.textContent = bestHand.handType;

            //update the player's account with their winnings
            this.player.updateAccount(betInput.value * bestHand.multiplier);

            dealBtn.textContent = "DEAL";
            betInput.removeAttribute("disabled");
            this.newHand = true;
        }
    }

    Game.prototype.hold = function(card, newHand) { // card should be the CSS ID of the image that should be held
        if(!newHand) {
            card.classList.toggle("hold");
        }
    };

    return Game;
	
})();