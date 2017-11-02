var Player = (function () {
	let credits = document.getElementById("credits");

	function Player(balance) {
		this.account = balance || 1000;
	}
	
	Player.prototype.updateAccount = function(amount) {
		this.account += amount;
		credits.textContent = this.account;
	};

	return Player;
	
})();