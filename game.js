var Game = (function () {

    function Game(balance, shuffleNow) {
        this.player = new Player(balance);
        this.deck = new Deck(shuffleNow);
        this.hand = new Hand();
    }

    Game.prototype.setUp = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betAmount = document.getElementById("bet-amount");

        console.log("Inside setUp");
        dealBtn.addEventListener("click", () => {
            betAmount.classList.add("disabled");
            betAmount.title = "";
            this.deal();
        });

        betAmount.addEventListener("click", function () {
            if(betAmount.value > 0) {
                dealBtn.classList.remove("disabled");
                dealBtn.title = "";
            }
        });

        console.log("End of setUp");
    };

    Game.prototype.deal = function() {
        let dealBtn = document.getElementById("deal-btn");
        let betAmount = document.getElementById("bet-amount");
        //let cardsOnTable = [].slice.call(document.getElementsByClassName("card"));
        //console.log(cardsOnTable);


        var deck = new Deck(true);        

        if(dealBtn.textContent === "DEAL") { // this is a new hand
            this.player.updateAccount(-betAmount.value);

            // deal 5 cards from deck into hand
            this.hand = new Hand(deck.deal(5));

            console.log(this.hand);

            dealBtn.textContent = "DRAW";

            //for(let i = 0; ) {
                
            //}
            
        }
        else { // this is not a new hand

        }
        
        
        let playerCredits = document.getElementById("credits")
        if(playerCredits) {

        }
            
        // update card images

        // calculate winnings

        // update the player account


    }

    Game.prototype.hold = function(name) { // name should be the CSS ID of the image that should be held
        name.classList.toggle("hold");
    };

    return Game;
	
})();