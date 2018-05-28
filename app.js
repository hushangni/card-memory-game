$(function() {

	// variables for commonly used elements
	let cards = $('.card');
	const deck = $('.deck');
	let counter = $('#moves');
	let matchedCards = document.getElementsByClassName("match");
	let closeBtn = $('.close');
	let modal = $('#winModal');
	let time = $('#time');
	let thumbs = $('.fa-thumbs-up');

	// variables for time, moves, and opened card list
	let openedCards = [];
	let thumbsUp = 5;
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
			$(cards[i]).removeClass("flip flipped match disable");
		}

		// reset moves
		moves = 0;
		$(counter)[0].innerHTML = moves + " moves";

		thumbsUp = 5;
		for (let i = 0; i < thumbs.length; i++) {
			$(thumbs[i]).css("color", "#438cf9");
			$(thumbs[i]).css("visibility", "visible");
		}
		second = 0;
		minute = 0;
		$(time)[0].innerHTML = "0 mins 0 secs";
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
		$(counter)[0].innerHTML = moves + " moves";
		// start timer on first click!
		if (moves == 1) {
			second = 0;
			minute = 0;
			startTimer();
		}

		if (moves < 30 && moves > 20) {
			for (let i = 0; i < 5; i++) {
				if (i > 3) {
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves < 40 && moves > 31) {
			for (let i = 0; i < 5; i++) {
				if (i > 2) {
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves < 55 && moves > 41) {
			for (let i = 0; i < 5; i++) {
				if (i > 1) {
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves > 56) {
			for (let i = 0; i < 5; i++) {
				if (i > 0) {
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		}
	}	

	// game timer
	const startTimer = () => {
		interval = setInterval( function() {
			second++;
			$(time)[0].innerHTML = minute + " mins " + second + " secs";
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
		if (matchedCards.length === 2) {
			clearInterval(interval);
			finalTime = $(time)[0].innerHTML;
			$(modal).addClass("show");
			let thumbsUp = document.querySelector(".thumbs").innerHTML;

			// display moves, time spent
			$('#totalMoves')[0].innerHTML = moves;
			$('#totalThumbs')[0].innerHTML = thumbsUp;
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
		init();
	}

	// for redo or play again restart the game
	$('.fa-redo').on('click', init);
	$('#play-again').on('click', playAgain);

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