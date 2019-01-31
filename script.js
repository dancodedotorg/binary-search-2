//Original Code inspired by this post: https://blog.upperlinecode.com/apcs-a-tool-to-teach-the-binary-search-algorithm-78b0c3c8c372

let main = document.querySelector("#mainContainer")
let scoreElement = document.querySelector("#score")
let resetElt = document.querySelector("#resetBtn");
resetElt.addEventListener('click', e => {
	reset();
});
var score = -1

let nums;
let children;
let randChoice = Math.floor(Math.random() * 3);
let includes50 = Math.floor(Math.random() * 8);

let scoresList = [];
//I'M USING A BUCKET SORT MECHANIC TO KEEP TRACK OF MODE! LOOK HOW CLEVER I AM!!
let scoresMode = Array.from({length: 21}, () => 0);
let curModeCount = 0;
let modeString = "";
//console.log(scoresMode);

let bestSpan = document.querySelector("#bestScoreSpan");
let modeSpan = document.querySelector("#modeScoreSpan");
let medianSpan = document.querySelector("#medianScoreSpan");
let worstSpan = document.querySelector("#worstScoreSpan");


//console.log(randChoice);
//console.log(includes50);

reset();

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
	randChoice = Math.floor(Math.random() * 3);
	includes50 = Math.floor(Math.random() * 8);
	main.innerHTML = "";
	
	if(randChoice == 0) {
		//random distribution
		nums = Array.from({length: 21}, () => Math.floor(Math.random() * 100));
		if(includes50 == 0) {
			nums[0] = 50;
		}
		nums.sort((a, b) => a - b);
	}
	if(randChoice == 1) {
		//skewed higher
		nums = Array.from({length: 21}, () => Math.floor(Math.random() * 60) + 40);
		if(includes50 == 0) {
			nums[0] = 50;
		}
		nums.sort((a, b) => a - b);
	}
	if(randChoice == 2) {
		//skewed lower
		nums = Array.from({length: 21}, () => Math.floor(Math.random() * 60));
		if(includes50 == 0) {
			nums[0] = 50;
		}
		nums.sort((a, b) => a - b);
	}

	//let nums = Array.from({length: 21}, () => Math.floor(Math.random() * 100)).sort((a, b) => a - b);
	// Create a times function
	const times = x => f => {if (x > 0) { f(); times (x - 1) (f)}}
	// Call the times function to create all the on-screen elements
	var i = 0
	times (21) (() => {main.innerHTML += `<div class="item grey"><div>Idx: ${i}</div><div class="number hidden">${nums[i]}</span></div>`, i+=1})
	// Create an array of random numbers

	children = document.querySelectorAll(".item")
	children.forEach(child => {
	  child.addEventListener('click', e => {
		if (child.classList.contains('grey')) {
		  //console.log(child.childNodes)
		  child.classList.remove('grey')
		  child.childNodes[1].classList.remove('hidden')
		  score += 1
		  scoreElement.innerHTML = score
		  //console.log(score)
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

