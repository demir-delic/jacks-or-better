var Game = (function () {

    function Game(balance, shuffleNow) {
        this.player = new Player(balance);
        this.deck = new Deck(shuffleNow);
        this.hand = new Hand();
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
                this.hold(cardImages[i], dealBtn.textContent === "DRAW");
            });
        }
    };

    Game.prototype.deal = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betAmount = document.getElementById("bet-amount");

        var deck = new Deck(true);

        if(dealBtn.textContent === "DEAL") { // this is a new hand
            this.player.updateAccount(-betAmount.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(deck.deal(5));
            console.log(this.hand);

            dealBtn.textContent = "DRAW";

            

            /*this.hand.forEach(card => {
                card.name
            });*/
            
        }
        else { // this is not a new hand

            // this.hand.forEach

            dealBtn.textContent = "DEAL";
            betAmount.removeAttribute("disabled");
            
        }

        // update card images

        // calculate winnings

        // update the player account

    }

    Game.prototype.hold = function(card, gameIsInDrawPhase) { // card should be the CSS ID of the image that should be held
        if(gameIsInDrawPhase) {
            card.classList.toggle("hold");
        }
    };

    return Game;
	
})();