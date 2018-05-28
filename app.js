$(function() {
	// const cardItems = ['keyboard', 'keyboard', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones', 'qrcode', 'sitemap', 'project-diagram', 'user-secret', 'bug', 'microchip', 'terminal', 'database', 'power-off', 'desktop', 'headphones'];

	// let flippedArray = [];
	// const wait = 500;
	// let match = 0;

	// get cards array to hold cards
	let cards = $('.card');
	console.log(cards);

	// get deck
	const deck = $('.deck');

	// set moves 
	let moves = 0;
	let counter = $('.moves');

	let matchedCard = $('.match');

	let closeBtn = $('.close');

	let modal = $('.modal');

	let openedCards = [];
	let second = 0;
	let minute = 0;
	let hour = 0;
	let timer = $(".time");
	let interval;



	// Shuffle the card items array. Returns new array.
	const shuffle = (cards) => {
		for (let i = 0; i < cards.length; i++) {
			// generate random index
			let randI = Math.floor(Math.random() * (i + 1));
			let x = cards[i];
			cards[i] = cards[randI];
			cards[randI] = x;
		}
		return cards;
	}

	// start game
	init();

	function init() {
		// shuffle deck
		cards = shuffle(cards);

		//remove classes from each card
		deck.innerHTML = "";
		for (let i = 0; i < cards.length; i++) {
			deck.append(cards[i]);
			$(cards[i]).removeClass("flip flipped matched");
		}
		$(".time")[0].innerHTML = "0 mins 0 secs";

		// reset moves
		moves = 0;
		counter.innerHTML = moves;
		second = 0;
		minute = 0;
	
		clearInterval(interval);
	}

	// when cards are matched
	const matched = () => {
		$(openedCards[0]).addClass("match disabled");
		$(openedCards[1]).addClass("match disabled");
		$(openedCards[0]).removeClass("flip flipped no-event");
		$(openedCards[1]).removeClass("flip flipped no-event");
		openedCards = [];
	}

	// when cards don't match
	const unmatched = () => {
		$(openedCards[0]).addClass("unmatched");
		$(openedCards[1]).addClass("unmatched");
		disable();
		setTimeout(function () {
			$(openedCards[0]).removeClass("flip flipped no-event unmatched");
			$(openedCards[1]).removeClass("flip flipped no-event unmatched");
			enable();
			openedCards = [];
		}, 400);
	}

	// disables cards temporarily
	const disable = () => {
		cards.filter(function (card) {
			$(cards[card]).addClass('disabled');
		})
	}

	// enables cards and disable matched cards
	const enable = () => {
		cards.filter(function (card) {
			$(cards[card]).removeClass('disabled');
			for (let i = 0; i < matchedCard.length; i++) {
				$(matchedCard[i]).addClass('disabled');
			}
		});
	}

	// count players moves



	// game timer


	for (let i = 0; i < cards.length; i++) {
		card = cards[i];
		$(card).on("click", function(){
			$(this).toggleClass('flip');
			$(this).toggleClass('diabled');
			$(this).toggleClass('flipped');
		});
		$(card).on("click", function() {
			openedCards.push(this);
			let len = openedCards.length;
			if (len === 2) {
				incrMoves();
				if( openedCards[0].type === openedCards[1].type) {
					matched();
				} else {
					unmatched();
				}
			}
		});
	}


})