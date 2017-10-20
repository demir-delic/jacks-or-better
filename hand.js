var Hand = (function () {

    function Hand(cards) {
        this.cards = cards || [];
    }

    Hand.prototype.addCards = function(cardsToAdd) {
        this.cards = this.cards.concat(cardsToAdd);
    }

    Hand.prototype.removeCards = function(names) {
        this.cards = this.cards.filter(item => {
            return !names.includes(item.name);
        });
    }

    Hand.prototype.getBestHand = function() {
        return getGroups(this.cards);
    }
        
    function isFlush(cards) {
        return this.cards.length === 5 &&
            cards[0].suit === cards[1].suit &&
            cards[0].suit === cards[2].suit &&
            cards[0].suit === cards[3].suit &&
            cards[0].suit === cards[4].suit;
    }

    function getGroups(cards) {
        let groups = {};
        let propertyName = "";

        hand.forEach(card => {
            propertyName = card.value;
            if(!groups[propertyName]) {
                groups[propertyName] = 1;
            }
            else {
                groups[propertyName]++;
            }
        });

        return groups;
    }

    return Hand;
    
})();