var Player = (function () {
	
	function Player(balance) {
		this.account = balance || 1000;
	}
	
	Player.prototype.updateAccount = function(amount) {
		this.account += amount;
	}

	return Player;
	
})();