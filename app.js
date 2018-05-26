$(function() {
	const cardItems = ['keyboard', 'keyboard', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones'];
	console.log(cardItems.length);

	let flippedArray = [];
	const wait = 500;
	let match = 0;

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
		$('.deck').find('.card').bind('click', function() {
			if ($(this).hasClass('flipped') || $(this).hasClass('matched')) {
				return true;
			}

			let card = $(this).context.innerHTML;
			$(this).addClass('flip flipped');
			flippedArray.push(card);

			// if we have 2 cards that are flipped, check if the most recent one matches the first one. 
			if (flippedArray.length > 1) {
				if (card == flippedArray[0]) {
					// if matched we turn the cards green. Remove styling from flipped cards that are not matched. 
					$('.deck').find('.flipped').addClass('matched');
					setTimeout(function () {
						$('.deck').removeClass('flip flipped');
					}, wait);
					match++;
				} 
			}


	}

	init();



})