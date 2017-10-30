var Game = (function () {
	
	var hand = [];
    var deck = new Deck(true);
    
    hand = new Hand(deck.deal(5));

    console.log(hand.getBestHand());
    
    console.log("hand: ", hand);
	
})();