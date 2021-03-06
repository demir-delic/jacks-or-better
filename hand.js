var Hand = (function () {

    function Hand(cards) {
        this.cards = cards || [];
    }

    Hand.prototype.getBestHand = function() {
        let cardGroups = getGroups(this.cards);
        let numCardGroups = Object.getOwnPropertyNames(cardGroups).length;

        if(numCardGroups === 5) {
            if(isFlush(this.cards)) {
                if(isStraight(cardGroups)){ // isStraightFlush
                    if(isRoyalFlush(cardGroups)) return { handType: "Royal Flush", multiplier: 250 }

                    else return { handType: "Straight Flush", multiplier: 50 }
                }
                else return { handType: "Flush", multiplier: 7 }
            }

            else if(isStraight(cardGroups)) return { handType: "Straight", multiplier: 5 }

            // player just has a high card
            else return { handType: "High Card (Busted)", multiplier: 0 }
        }
        else if(numCardGroups === 4) { // there is a pair; isJacksOrBetter checks if the pair is strong enough
            if(isJacksOrBetter(cardGroups)) return { handType: "1 Pair, Jacks or Better", multiplier: 1 }

            else return { handType: "1 Pair, Not Jacks or Better (Busted)", multiplier: 0 }
        }
        else if(numCardGroups === 3) {
            if(isTwoPairOrFullHouse(cardGroups)) return { handType: "2 Pair", multiplier: 2 }

            // 3 of a Kind is true by default if there are 3 card groups and isTwoPair returns false         
            else  return { handType: "3 of a Kind", multiplier: 3 }
        }
        else if(numCardGroups === 2) {
            if(isTwoPairOrFullHouse(cardGroups)) return { handType: "Full House", multiplier: 10 }
            
            // 4 of a Kind is true by default if there are 2 card groups and isFullHouse returns false               
            else return { handType: "4 of a Kind", multiplier: 40 }
        }
    };
        
    function isRoyalFlush(cardGroups) {
        // is the hand a straight flush, and is the low card a 10?
        return Object.getOwnPropertyNames(cardGroups)[0] == 10;
    }

    function isFlush(cards) {
        return cards[0].suit === cards[1].suit &&
               cards[0].suit === cards[2].suit &&
               cards[0].suit === cards[3].suit &&
               cards[0].suit === cards[4].suit;
    }

    function isStraight(cardGroups) {
        let cardGroupsValues = Object.getOwnPropertyNames(cardGroups);      

        // cardGroupsValues is sorted, so use the difference between the first and last card to determine a straight
        if(cardGroupsValues[4] - cardGroupsValues[0] === 4) { return true; } // implicit conversion from string to number

        /* if the lowest card is a 2, this may be a straight with a low ace, so check the difference between the
           lowest and second-highest card instead of the difference between the lowest and highest (the ace) */
        if(cardGroupsValues[0] == 2) { // use loose equality because the elements of cardGroupsValues are strings
            if(cardGroupsValues[3] - cardGroupsValues[0] === 3) { return true; }
        }

        return false;
    }

    function isTwoPairOrFullHouse(cardGroups) {
        // check whether any of the card groups have 2 cards  
        
        return Object.values(cardGroups).some(numCardsInCardGroup => {
            return numCardsInCardGroup === 2;
        });
    }

    function isJacksOrBetter(cardGroups) {
        // check whether the card group with 2 cards has a value > 10

        return Object.entries(cardGroups).some(valueGroupPair => {
            
            if(valueGroupPair[1] === 2) { // if card group has 2 cards...
                if(valueGroupPair[0] > 10) { // ...check whether that card group is for a Jack or better
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