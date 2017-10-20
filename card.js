var Card = (function () {

    function Card(name) {
        this.name = name;
        this.value = getCardValue(name);
        this.suit = getCardSuit(name);
    }

    function getCardValue(name) {
        if(name[0] === "1") return 10;
        else if(name[0] === "J") return 11;
        else if(name[0] === "Q") return 12;    
        else if(name[0] === "K") return 13;                
        else if(name[0] === "A") return 14;
        else return parseInt(name[0]);
    }

    function getCardSuit(name) {
        let suit = name[name.length - 1];

        if(suit === "H") return "Hearts";        
        else if(suit === "D") return "Diamonds";
        else if(suit === "C") return "Clubs";    
        else return "Spades";
    }

    return Card;
    
})();