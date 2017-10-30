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
        let cardGroups = getGroups(this.cards);
        let numCardGroups = Object.getOwnPropertyNames(cardGroups).length;

        console.log("cardGroups ", cardGroups);
        console.log("numCardGroups: ", numCardGroups);

        if(numCardGroups === 5) {
            if(isRoyalFlush(this.cards)) {
                return {
                    handType: "Royal Flush",
                    multiplier: 250
                }
            }
            else if(isStraightFlush(this.cards)){
                return {
                    handType: "Straight Flush",
                    multiplier: 50
                }
            }
            else if(isFlush(this.cards)){
                return {
                    handType: "Flush",
                    multiplier: 7
                }
            }
            else if(isStraight(cardGroups)){
                return {
                    handType: "Straight",
                    multiplier: 5
                }
            }
            else {
                return {
                    handType: "Busted",
                    multiplier: 0
                }
            }
        }
        else if(numCardGroups === 4) { // there is a pair; isJacksOrBetter checks if the pair is strong enough
            if(isJacksOrBetter(cardGroups)) {
                return {
                    handType: "1 Pair",
                    multiplier: 1
                }
            }
            else {
                return {
                    handType: "Busted",
                    multiplier: 0
                }
            }
        }
        else if(numCardGroups === 3) {
            if(isTwoPairOrFullHouse(cardGroups)) {
                return {
                    handType: "2 Pair",
                    multiplier: 2
                }
            }
            else {  // 3 of a Kind is true by default if there are 3 card groups and isTwoPair returns false                
                return {
                    handType: "3 of a Kind",
                    multiplier: 3
                }
            }
        }
        else if(numCardGroups === 2) {
            if(isTwoPairOrFullHouse(cardGroups)) {
                return {
                    handType: "Full House",
                    multiplier: 10
                }
            }
            else {  // 4 of a Kind is true by default if there are 2 card groups and isFullHouse returns false                
                return {
                    handType: "4 of a Kind",
                    multiplier: 40
                }
            }
        }
    }
        
    function isRoyalFlush(cards) {
        //let 
        //return (isStraightFlush(cards) && )
    }

    function isStraightFlush(cards) {
        return (isStraight(cards) && isFlush(cards));
    }

    /*function isFourOfAKind(cardGroups) {
        // reached by default if there are 2 card groups and isFullHouse returns false
        // this function is a duplicate of isThreeOfAKind
        return true;
    }

    function isFullHouse(cardGroups) {
        // check whether any of the card groups have 2 cards (would also work with 3 instead of 2)
        // this function is a duplicate of isTwoPair
    }*/

    function isFlush(cards) {
        return cards[0].suit === cards[1].suit &&
               cards[0].suit === cards[2].suit &&
               cards[0].suit === cards[3].suit &&
               cards[0].suit === cards[4].suit;
    }

    function isStraight(cardGroups) {
        //
        let cardGroupsValues = Object.getOwnPropertyNames(cardGroups);

        console.log("Object.getOwnPropertyNames(cardGroups): ", Object.getOwnPropertyNames(cardGroups));        
        console.log("Object.entries(cardGroups): ", Object.entries(cardGroups));

        if(cardGroupsValues[0] === 2) { // if the lowest card is a 2, this may be a straight with a low ace, so...
            cardGroupValues.some(cardValue => {
                if(cardValue === 14) { // ...set ace value to 1 instead of 14 
                    cardValue = 1;
                }
            })
        }

        return (cardGroupsValues.forEach(group => {
            
        }));
    }

    /*function isThreeOfAKind(cardGroups) {
        // reached by default if there are 3 card groups and isTwoPair returns false
        return true;
    }*/

    function isTwoPairOrFullHouse(cardGroups) {
        // check whether any of the card groups have 2 cards
        console.log("Object.values(cardGroups): ", Object.values(cardGroups));        
        
        return Object.values(cardGroups).some(numCardsInCardGroup => {
            console.log("numCardsInCardGroup: ", numCardsInCardGroup);
            return numCardsInCardGroup === 2;
        })
    }

    function isJacksOrBetter(cardGroups) {
        // check whether the card group with 2 cards has a value > 10
        console.log("Object.entries(cardGroups): ", Object.entries(cardGroups));

        return Object.entries(cardGroups).some(keyValuePair => {
            console.log("keyValuePair: ", keyValuePair);
            
            if(keyValuePair[1] === 2) { // if card group has 2 cards...
                if(keyValuePair[0] > 10) { // ...check whether that card group is for a Jack or better
                    console.log("Successful keyValuePair: ", keyValuePair);
                    return true;
                }
            }
        });
    }

    function getGroups(cards) {
        let groups = {};
        let propertyName = "";

        cards.forEach(card => {
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