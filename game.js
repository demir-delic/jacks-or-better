var Game = (function () {

    function Game(balance, shuffleNow) {
        this.player = new Player(balance);
        this.deck = new Deck(shuffleNow);
        this.hand = new Hand();
        this.newHand = true;
    }

    Game.prototype.setUp = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betAmount = document.getElementById("bet-amount");

        dealBtn.addEventListener("click", () => {
            betAmount.setAttribute("disabled", "true");
            betAmount.title = "";
            this.deal();
        });

        betAmount.addEventListener("click", function () {
            if(betAmount.value > 0) {
                dealBtn.classList.remove("disabled");
                dealBtn.title = "";
            }
        });

        let cardImages = [];

        for(let i = 0; i < 5; i++) {
            cardImages[i] = document.getElementById(`cardImage${i + 1}`);

            cardImages[i].addEventListener("click", () => {
                this.hold(cardImages[i], this.newHand);
            });
        }
    };

    Game.prototype.deal = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betAmount = document.getElementById("bet-amount");

        var deck = new Deck(true);

        if(this.newHand) { // this is a new hand
            this.player.updateAccount(-betAmount.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(deck.deal(5));
            console.log(this.hand);

            dealBtn.textContent = "DRAW";

            

            /*this.hand.forEach(card => {
                card.name
            });*/
            this.newHand = false;
        }
        else { // this is not a new hand

            // this.hand.forEach

            dealBtn.textContent = "DEAL";
            betAmount.removeAttribute("disabled");
            this.newHand = true;
        }

        // update card images

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