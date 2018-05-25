$(function() {
	const cardItems = ['keyboard', 'keyboard', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones'];
	console.log(cardItems.length);

	// Shuffle the card items array. Returns new array.
	const shuffle = (cards) => {
		let cardsArray = cards;
		for (let i = 0; i < cardsArray.length; i++) {
			// generate random index
			let randI = Math.floor(Math.random() * (i + 1));
			let x = cardsArray[i];
			cardsArray[i] = cardsArray[randI];
			cardsArray[randI] = x;
		}
		return cardsArray;
	}

	//begin game
	const init = () => {

		let cards = shuffle(cardItems);
		$('.deck').empty();

		// shuffle cards and generate all li elements for deck
		for (let i = 0; i < cards.length; i++) {
		        $('.deck').append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
		}
		cardListener();
	}

	const cardListener = () => {

		// flip the card that is clicked on
		$('.deck')
	}

	init();



})