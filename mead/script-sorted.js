//Original Code inspired by this post: https://blog.upperlinecode.com/apcs-a-tool-to-teach-the-binary-search-algorithm-78b0c3c8c372

let main = document.querySelector("#mainContainer")
let scoreElement = document.querySelector("#score")
let resetElt = document.querySelector("#resetBtn");
let winningNumElt = document.querySelector("#winningSpan");

let tickets5Elt = document.querySelector("#tickets5Button");
let tickets21Elt = document.querySelector("#tickets21Button");
let tickets100Elt = document.querySelector("#tickets100Button");

resetElt.addEventListener('click', e => {
	reset();
});

tickets5Elt.addEventListener('click', e => {
	numTickets = 5;
	setupMode();
	reset();
})

tickets21Elt.addEventListener('click', e => {
	numTickets = 21;
	setupMode();
	reset();
})

tickets100Elt.addEventListener('click', e => {
	numTickets = 100;
	setupMode();
	reset();
})

var score = -1

let nums;
let children;
let winningNum;
//console.log(winningNum);
let randChoice;
let includesWinner;
var numTickets = 21;

let bestSpan = document.querySelector("#bestScoreSpan");
let modeSpan = document.querySelector("#modeScoreSpan");
let medianSpan = document.querySelector("#medianScoreSpan");
let worstSpan = document.querySelector("#worstScoreSpan");


//console.log(randChoice);
//console.log(includesWinner);

let scoresList;
let scoresMode;
let curModeCount;
let modeString;

setupMode();
reset();

function setupMode() {
	scoresList = [];
	//I'M USING A BUCKET SORT MECHANIC TO KEEP TRACK OF MODE! LOOK HOW CLEVER I AM!!
	scoresMode = Array.from({length: numTickets}, () => 0);
	curModeCount = 0;
	modeString = "";
	//console.log(scoresMode);
	bestSpan.innerHTML = "";
	modeSpan.innerHTML = "";
	medianSpan.innerHTML = "";
	worstSpan.innerHTML = "";
}

function randBetween(a, b) {
	return Math.floor(Math.random() * (b-a + 1)) + a;
}

function updateScores() {
	if(score <= 0) {
		return;
	}
	scoresMode[score] += 1;
	if(scoresMode[score] == curModeCount) {
		//refactor mode!
		modeString += ", " + score;
	}
	if(scoresMode[score] > curModeCount) {
		curModeCount++;
		modeString = score;
	}
	scoresList.push(score);
	scoresList.sort((a, b) => a - b);
	console.log(scoresList);



	bestSpan.innerHTML = scoresList[0];
	modeSpan.innerHTML = modeString;
	medianSpan.innerHTML = scoresList[Math.floor(scoresList.length / 2)];
	worstSpan.innerHTML = scoresList[scoresList.length - 1];
}

function reset() {
	updateScores();
	score = 0;
	scoreElement.innerHTML = score
	winningNum = randBetween(10, 90);
	randChoice = randBetween(0, 2);
	includesWinner = randBetween(0, 7);
	main.innerHTML = "";
	main.classList.remove("tickets-5");
	main.classList.remove("tickets-21");
	main.classList.remove("tickets-100");
	if(numTickets == 5) {
		main.classList.add("tickets-5");
	}
	if(numTickets == 21) {
		main.classList.add("tickets-21");
	}
	if(numTickets == 100) {
		main.classList.add("tickets-100");
	}

	if(randChoice == 0) {
		//random distribution
		nums = Array.from({length: numTickets}, () => randBetween(0, 99));
		if(includesWinner == 0) {
			nums[0] = winningNum;
		}
		nums.sort((a, b) => a - b);
	}
	if(randChoice == 1) {
		//skewed higher, but winningNum in lower half
		nums = Array.from({length: numTickets}, () => randBetween(40, 99));
		winningNum = randBetween(40, 60);
		if(includesWinner == 0) {
			nums[0] = winningNum;
		}
		nums.sort((a, b) => a - b);
	}
	if(randChoice == 2) {
		//skewed lower
		nums = Array.from({length: numTickets}, () => randBetween(0, 60));
		winningNum = randBetween(40, 60);
		if(includesWinner == 0) {
			nums[0] = winningNum;
		}
		nums.sort((a, b) => a - b);
	}
	winningNumElt.innerHTML = winningNum;

	//let nums = Array.from({length: numTickets}, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
	// Create a times function
	const times = x => f => {if (x > 0) { f(); times (x - 1) (f)}}
	// Call the times function to create all the on-screen elements
	var i = 0
	times (numTickets) (() => {main.innerHTML += `<div data-value="${nums[i]}" class="item grey"><div>Ticket Number ${i+1}</div><div class="number hidden">${nums[i]}</span></div>`, i+=1})
	// Create an array of random numbers

	children = document.querySelectorAll(".item")
	children.forEach(child => {
	  child.addEventListener('click', e => {
		let val = child.getAttribute("data-value");
		if (child.classList.contains('grey')) {
		  //console.log(child.childNodes)
		  child.classList.remove('grey')
		  child.childNodes[1].classList.remove('hidden')
		  score += 1
		  scoreElement.innerHTML = score
			if(val == winningNum) {
				child.classList.add("winner");
			}
		  //console.log(score)
		} else {
			//THIS PART LETS YOU UNSELECT
			//child.classList.add('grey');
			//child.classList.remove("winner");
			//child.childNodes[1].classList.add('hidden');
		}
	  })
	  //console.log("child")
	})
}


document.addEventListener("keydown", e => {
   if(e.key == "Enter") {
       reset();
   }
});
