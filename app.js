// initail load
var noOfSquares = 6;
var colors = [];
var resultMessage = '';
var theChosenColor = '';
const MAX_HEX_VALUE = 254;

// all DOM objects
var squares = document.querySelectorAll('.square'); // querySelectorAll('css selector') returns NodeList
var resetButton = document.querySelector('#reset')
var modeButton = document.querySelectorAll('.mode');
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var colorDisplay = document.getElementById("color-code");


function enterWinState(theChosenColor){
	h1.style.backgroundColor = theChosenColor;
	for(let indx=0; indx<noOfSquares; indx++){
		squares[indx].style.backgroundColor = theChosenColor;
	}

}

// load the game
initailzer();

function initailzer(){
	setModeButtons();
	resetContainer();
}


function setModeButtons(){

	for(let btnNo=0; btnNo< modeButton.length; btnNo++){

		modeButton[btnNo].addEventListener('click', function(){  // event for each btn
			modeButton[0].classList.remove('selectedButtonProperty');
			modeButton[1].classList.remove('selectedButtonProperty');
			this.classList.add('selectedButtonProperty');
			if(this.textContent == 'Easy'){
				noOfSquares = 3;
			}
			else{
				noOfSquares = 6;
			}
			resetContainer(noOfSquares);
		});
	}
}

function getRandomColor(){
	let theChosenSquare = Math.floor(Math.random()*(noOfSquares-1+1));  // Math.floor(Math.random()*(max-min+1))+min
	theChosenColor = squares[theChosenSquare].style.backgroundColor;
	console.log(theChosenColor+' '+theChosenSquare);
	colorDisplay.textContent = theChosenColor;
}


// ----------------------------------------------------------------------------------------------

function setSquares(){

	for(let i=0; i<noOfSquares ; i++ ){

		squares[i].addEventListener('mouseover', function(){
			this.style.transform = 'scale(1.1,1.1)' ;
		});
		squares[i].addEventListener('mouseout', function(){
			this.style.transform = 'scale(1,1)' ;
		});
		squares[i].addEventListener('click', function(){

			var clickedColor = this.style.backgroundColor;
			if(clickedColor == theChosenColor){
				console.log(200);
				setMessage('Correct 🎖');
				enterWinState(theChosenColor);
				resetButton.textContent = 'Play Again?';
			}
			else{
				this.style.backgroundColor = '#000218';
				setMessage('Try Again 😿');

			}

			// remove eventListener
			
		});
	}
	getRandomSets(noOfSquares);
	let colorIndx = 0;
	for(let sqrNo=0; sqrNo<noOfSquares ; sqrNo++){
		squares[sqrNo].style.backgroundColor = "rgb("+ colors[colorIndx] +","+ colors[colorIndx+1] +","+ colors[colorIndx+2] +")";  // 'rgb('+ r + ',' + g + ',' + b +')'
		colorIndx += 3;
	}

}

function getRandomSets(noOfSquares){
	let format =['r', 'g', 'b'];
	//console.log(noOfSquares);
	for(let i=0; i<(noOfSquares*3); i++){
		colors[i] = quickRandom();

		// for background which is rgb(0,2,24)
		if(i%3==2 && colors[i]==24 && colors[i-1]==2 && colors[i-2]==0){
			i -= 2;
		}
	}
	console.log(colors);
}

function quickRandom(){
	return (Math.ceil(Math.random()*MAX_HEX_VALUE));
}

//----------------------------------------------------------------------------------------------
function setMessage(msgString){
	messageDisplay.textContent = "";
	setTimeout(function(){
		if(msgString == 'Correct 🎖'){
			messageDisplay.style.fontWeight = '900';
		}
		messageDisplay.textContent = msgString ;
	}, 300);
}

function resetContainer(noOfSquares){
	// set UI
	if(noOfSquares==3){
		for(let i=3; i<6; i++){
			squares[i].style.display = 'none';
		}
	}
	if(resetButton.textContent == 'Play Again?'){
		resetButton.textContent = 'New Colors';
	}
	messageDisplay.textContent = '';
	setSquares(noOfSquares);
	getRandomColor();
}

resetButton.addEventListener("click", function()
{
	resetContainer();
});
