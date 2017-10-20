var Game = (function () {
	
	let hand = [];
    var deck = new Deck(true);
    
    hand = new Hand(deck.deal(5));
    
    console.log(hand);
	
})();