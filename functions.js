/*This class controls the audio for the game*/
class AudioController{
	constructor(){
		this.matchSound = new Audio('audio/Positive_Card_Flip.mp3');
		this.matchSound.volume = 0.4;
		this.noMatchSound = new Audio('audio/Negative_Card_Flip.mp3');
		this.noMatchSound.volume = 0.3;
	}

	/* Function thats called when card is successfully flipped*/
	successSound(){
		this.matchSound.play();
	}

	/* Function thats called when card is not successfully flipped*/
	failSound(){
		this.noMatchSound.play();
	}
}
let audioController = new AudioController();

/*Variables for the flip function/counter*/
const cards = document.querySelectorAll(".memoryCard");
var isFlipped = false;
var firstCard, secondCard;
var lock = false;
var flipCount = 0;
var successCount = 0;

/* Allows cards to be flipped then adds it to the counter and runs the check() function*/
cards.forEach(card => card.addEventListener("click", flip));
function flip() {
		if (lock) return;
		if (this === firstCard) return;
		this.classList.add("flip");
		if (!isFlipped) {
			isFlipped = true;
			firstCard = this;
			flipCount++;
			document.getElementById("flipCounter").innerHTML = flipCount;
			document.getElementById("fc").innerHTML = flipCount;

			return;
		}
		secondCard = this;
		flipCount++;
		document.getElementById("flipCounter").innerHTML = flipCount;
		document.getElementById("fc").innerHTML = flipCount;

		check();
}

/*Checks to see if both cards flipped match then runs succes() and fail() functions*/
function check() {
		var isMatch = firstCard.dataset.image === secondCard.dataset.image;
		isMatch ? succes() : fail();
}

/*Is called when cards match so they dont flip back over. Plays success sound*/
function succes() {
		firstCard.removeEventListener("click", flip);
		secondCard.removeEventListener( "click", flip);
		audioController.successSound();
		++successCount
		levelOver();
		reset();
}

/*Is called when cards dont match and then flips then back over. Plays fail sound*/
function fail() {
		lock = true;
		audioController.failSound();
		setTimeout(() => {
				
				firstCard.classList.remove("flip");
				secondCard.classList.remove ("flip");
				reset();
		}, 1000);
}

/*Is called once the success count reaches the given number for each level. Allows the gameover screen to display and stops the timer.*/
function levelOver() {
	if (document.title == "AniMatch (Easy)") {
		if (successCount == 4) {
			clearInterval(runTimer);
			document.getElementById("myNav").style.width = "100%";	
		}	
	}
	if (document.title == "AniMatch (Medium)") {
		if (successCount == 8) {
			clearInterval(runTimer);
			document.getElementById("myNav").style.width = "100%";	
		}	
	}
	if (document.title == "AniMatch (Hard)") {
		if (successCount == 12) {
			clearInterval(runTimer);
			document.getElementById("myNav").style.width = "100%";	
		}	
	}

}

/*Function that resets the whole level*/
function reset() {
		
		[isFlipped, lock] = [false, false];
		[firstCard, secondCard] = [null, null];
}

/*Variables for the time function*/
var minutesLabel = document.getElementById("minutes");
var minLabel = document.getElementById("min");
var secondsLabel = document.getElementById("seconds");
var secLabel = document.getElementById("sec");
var totalSeconds = 0;
var runTimer = setInterval(setTime, 1000);

/* Function to add seconds to the time then converts it to minuted and seconds*/
function setTime()
{
	++totalSeconds;
	secondsLabel.innerHTML = pad(totalSeconds%60);
	minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));

	secLabel.innerHTML = pad(totalSeconds%60);
	minLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

/*Formats the time*/
function pad(val)
{
	var valString = val + "";
	if(valString.length < 2)
	{
		return "0" + valString;
	}
	else
	{
		return valString;
	}
}

/*Function that shuffled the cards each time the level starts*/
(function suffle() {
		cards.forEach( card => {
				var position = Math.floor(Math.random() * 16);
				card.style.order = position;
		});
})();