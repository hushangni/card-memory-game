$(function() {

	// variables for commonly used elements
	let cards = $('.card');
	const deck = $('.deck');
	let counter = $('#moves');
	// $('.match') keeps giving 24
	let matchedCards = document.getElementsByClassName("match");
	let closeBtn = $('.close');
	let playAgainBtn = $('#playAgain');
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
	function init() {
		// shuffle deck
		cards = shuffle(cards);

		//remove classes from each card
		deck.innerHTML = "";
		for (let i = 0; i < cards.length; i++) {
			// add the shuffled cards on to the deck
			deck.append(cards[i]);
			$(cards[i]).removeClass("flip flipped match disabled");
		}

		// reset moves
		moves = 0;
		$(counter)[0].innerHTML = moves + " moves";

		// refresh thumbs to 5, make them all visible
		thumbsUp = 5;
		for (let i = 0; i < thumbs.length; i++) {
			$(thumbs[i]).css("color", "#438cf9");
			$(thumbs[i]).css("visibility", "visible");
		}

		// reset timer
		second = 0;
		minute = 0;
		$(time)[0].innerHTML = "0 mins 0 secs";
		clearInterval(interval);
	}

	// Start game call ////
	init();

	// matched();
	// when 2 cards match call to toggle appropriate classes
	const matched = () => {
		$(openedCards[0]).addClass("match disabled");
		$(openedCards[1]).addClass("match disabled");
		$(openedCards[0]).removeClass("flip flipped no-event unmatched");
		$(openedCards[1]).removeClass("flip flipped no-event unmatched");
		openedCards = [];
	}

	// unmatched();
	// when 2 cards don't match call to toggle appropriate classes
	const unmatched = () => {
		$(openedCards[0]).addClass("unmatched");
		$(openedCards[1]).addClass("unmatched");
		// disable all cards for a short while
		disable();
		setTimeout(function () {
			$(openedCards[0]).removeClass("flip flipped unmatched");
			$(openedCards[1]).removeClass("flip flipped unmatched");
			// enable all cards for clicking again
			enable();
			openedCards = [];
		}, 400);
	}

	// disable();
	// disables cards temporarily
	const disable = () => {
		for (let i = 0; i < cards.length; i++) {
			$(cards[i]).addClass('disabled');
		}
	}

	// enable();
	// enables cards and disable matched cards
	const enable = () => {
		for (let i = 0; i < cards.length; i++) {
			$(cards[i]).removeClass('disabled');
		}

		for (let i = 0; i < matchedCards.length; i++) {
			$(matchedCards[i]).addClass("disabled");
		}
	}

	// incrMoves();
	// increments player moves
	const incrMoves = () => {
		moves++;
		// update moves in HTML during game
		$(counter)[0].innerHTML = moves + " moves";

		// start timer on first click!
		if (moves == 1) {
			second = 0;
			minute = 0;
			startTimer();
		}

		// tiers for how many thumbs a player retains based on moves
		if (moves < 30 && moves > 20) {
			for (let i = 0; i < 5; i++) {
				if (i > 3) {
					// 4 thumbs
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves < 40 && moves > 31) {
			for (let i = 0; i < 5; i++) {
				if (i > 2) {
					// 3 thumbs
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves < 55 && moves > 41) {
			for (let i = 0; i < 5; i++) {
				if (i > 1) {
					// 2 thumbs
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		} else if (moves > 56) {
			for (let i = 0; i < 5; i++) {
				if (i > 0) {
					// 1 thumb
					$(thumbs[i]).css("visibility", "collapse");
				}
			}
		}
	}	

	// startTimer();
	// starts timing for the game
	const startTimer = () => {
		interval = setInterval( function() {
			second++;
			$(time)[0].innerHTML = minute + " mins " + second + " secs";
			if (second == 60) {
				minute++;
				second = 0;
			}
			if (minute == 60) {
				alert("You have taken 1 hour to play this game! Ridiculous!")
			}
		}, 700);
	}


	// checkWinnerModal();
	// make the winner modal pop up when game is completed
	const checkWinnerModal = () => {
		// occurs when all 24 cards are matched
		if (matchedCards.length === 24) {
			// reset interval
			clearInterval(interval);
			finalTime = $(time)[0].innerHTML;
			// show the win modal
			$(modal).addClass("show");
			let thumbsUp = document.querySelector(".thumbs").innerHTML;

			// display moves, thumbs left, and time spent
			$('#totalMoves')[0].innerHTML = moves;
			$('#totalThumbs')[0].innerHTML = thumbsUp;
			$('#totalTime')[0].innerHTML = finalTime;

			// let the x button on modal listen for close click
			closeModal();
			playAgain();
		}
	}

	// closeModal();
	// hids the win modal 
	const closeModal = () => {
		closeBtn.on('click', function(e) {
			$(modal).removeClass('show');
		});
	}

	// playAgain();
	// when play again button is clicked, start the game again
	// also close modal
	const playAgain = () => {
		playAgainBtn.on('click', function(e) {
			$(modal).removeClass('show');
			init();
		});
	}

	// always be listening for restart button being clicked
	$('.fa-redo').on('click', init);

	// always be listening to card clicks and do the appropriate things with the cards
	for (let i = 0; i < cards.length; i++) {
		card = cards[i];

		// show card
		$(card).on("click", function(){
			$(this).toggleClass('flip');
			$(this).toggleClass('disabled');
			$(this).toggleClass('flipped');
		});
		// check match/unmatch
		$(card).on("click", function() {
			openedCards.push(this);
			let len = openedCards.length;
			if (len === 2) {
				incrMoves();
				if(openedCards[0].type === openedCards[1].type) {
					matched();
				} else {
					unmatched();
				}
			}
		});
		// check winner 
		$(card).on("click", checkWinnerModal);
	}
});