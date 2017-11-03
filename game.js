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

        if(this.newHand) { // this is a new hand

            for(let i = 0; i < this.cardImages.length; i++) {
                this.cardImages[i].classList.remove("hold");
            }

            this.player.updateAccount(-betInput.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(this.deck.deal(5));
            console.log(this.hand);

            dealBtn.textContent = "DRAW";

            for(let i = 0; i < this.cardImages.length; i++) {
                console.log(this.cardImages[i])
                console.log(this.hand.cards[i].name);
                this.cardImages[i].src=`img/${this.hand.cards[i].name}.png`;
            }

            /*this.hand.forEach(card => {
                card.name
            });*/

            this.newHand = false;
        }
        else { // this is not a new hand



            this.hand.getBestHand();

            dealBtn.textContent = "DEAL";
            betInput.removeAttribute("disabled");
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