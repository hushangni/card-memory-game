$(function() {

	// variables for commonly used elements
	let cards = $('.card');
	const deck = $('.deck');
	let counter = $('.moves');
	let matchedCards = document.getElementsByClassName("match");
	let closeBtn = $('.close');
	let modal = $('.modal');
	let time = $(".time");

	// variables for time, moves, and opened card list
	let openedCards = [];
	let moves = 0;
	let second = 0;
	let minute = 0;
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

	// Start game ////////////////////
	init();

	function init() {
		// shuffle deck
		cards = shuffle(cards);

		//remove classes from each card
		deck.innerHTML = "";
		for (let i = 0; i < cards.length; i++) {
			deck.append(cards[i]);
			$(cards[i]).removeClass("flip flipped match");
		}
		$(time)[0].innerHTML = "0 mins 0 secs";

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
		$(openedCards[0]).removeClass("flip flipped no-event unmatched");
		$(openedCards[1]).removeClass("flip flipped no-event unmatched");
		openedCards = [];
	}

	// when cards don't match
	const unmatched = () => {
		$(openedCards[0]).addClass("unmatched");
		$(openedCards[1]).addClass("unmatched");
		disable();
		setTimeout(function () {
			$(openedCards[0]).removeClass("flip flipped unmatched");
			$(openedCards[1]).removeClass("flip flipped unmatched");
			enable();
			openedCards = [];
		}, 400);
	}

	// disables cards temporarily
	const disable = () => {
		for (let i = 0; i < cards.length; i++) {
			$(cards[i]).addClass('disabled');
		}
		// cards.filter.call(cards, function (card) {
		// 	$(cards[card]).addClass('disabled');
		// });
	}

	// enables cards and disable matched cards
	const enable = () => {
		for (let i = 0; i < cards.length; i++) {
			$(cards[i]).removeClass('disabled');

		}

		for (let i = 0; i < matchedCards.length; i++) {
			$(matchedCards[i]).addClass("disabled");
		}
		// cards.filter.call(cards, function (card) {
		// 	$(cards[card]).removeClass('disabled');
		// 	for (let i = 0; i < matchedCards.length; i++) {
		// 		$(matchedCards[i]).addClass('disabled');
		// 	}
		// });
	}

	// count players moves
	const incrMoves = () => {
		moves++;
		counter.innerHTML = moves;
		// start timer on first click!
		if (moves == 1) {
			second = 0;
			minute = 0;
			startTimer();
		}
	}	

	// game timer
	const startTimer = () => {
		interval = setInterval( function() {
			$(time)[0].innerHTML = minute + " mins " + second + " secs";
			second++;
			if (second == 60) {
				minute++;
				second = 0;
			}
			if (minute == 60) {
				hour++;
				minute = 0;
			}
		}, 700);
	}

	// winner modal
	const winnerModal = () => {
		if (matchedCards.length == 2) {
			clearInterval(interval);
			finalTime = $(time)[0].innerHTML;
			$(modal).addClass("show");

			// display moves, time spent
			$('#totalMoves')[0].innerHTML = moves;
			$('#totalTime')[0].innerHTML = finalTime;

			closeModal();
		}
	}

	const closeModal = () => {
		closeBtn.on("click", function(e) {
			$(modal).removeClass("show");
		});
	}

	const playAgain = () => {
		$(modal).removeClass("show");
	}

	// for redo or play again restart the game
	$('.fa-redo').on('click', init);
	$('#play-again').on('click', init);

	for (let i = 0; i < cards.length; i++) {
		card = cards[i];
		$(card).on("click", function(){
			$(this).toggleClass('flip');
			$(this).toggleClass('disabled');
			$(this).toggleClass('flipped');
		});
		$(card).on("click", function() {
			openedCards.push(this);
			let len = openedCards.length;
			// if (len === 1) {
			// 	openCards[0].addClass('disabled')
			// }
			if (len === 2) {
				incrMoves();
				if(openedCards[0].type === openedCards[1].type) {
					matched();
				} else {
					unmatched();
				}
			}
		});
		$(card).on("click", winnerModal);
	}


})