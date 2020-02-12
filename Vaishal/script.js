var currentPlayer = ' ';
var stateOfBoard = [
	[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

function resetBoard() {
	// loop the outer array
	for (var i = 0; i < stateOfBoard.length; i++) {
	    // loop the inner array
	    for (var j = 0; j < 3; j++) {
	        setBoxValue(i, j, ' ');
	    }
	}
}

function setBoxValue(row, column, value) {
	stateOfBoard[row][column] = value;
	console.log(row, column, value);
	if(value === 'X') {
		// Check if value is X then show X and hide O
		$("#O"+row+column).hide();
		$("#X"+row+column).show();
	} else if (value === 'O') {
		// Check if value is O then show O and hide X
		$("#O"+row+column).show();
		$("#X"+row+column).hide();
	} else {
		// check if not X and O provide in value
		// thhen hide both of them
		$("#O"+row+column).hide();
		$("#X"+row+column).hide();
	}
}

function computerTurn() {
	if (currentPlayer !== 'O'){return;}

	for (var i=0; i<3; ++i){
		for (var j=0; j<3; ++j){
			if (stateOfBoard[i][j] === ' '){
				setBoxValue(i, j, 'O');
				checkResult();
				currentPlayer = 'X';
				$("#info").html("Please take your turn. Select any place to put cross.");
				return;
			}
		}	
	}
}

function checkResult() {
	var winner = getTheWinner();

	if (winner === 'X'){
		alert("Congratulations!\nYou Win!");
	}
	if (winner === 'O'){
		alert("Game Over!\nYou Lose!");
	}
	if (winner === 'tie'){
		alert("Game Over!\nits a tie.");		
	}

	if(winner !== "continue") {
		currentPlayer = ' ';
		resetBoard();
	}
}

function getTheWinner() {
	var anyEmptyValue = false;

	for (var i=0; i<3; ++i){
		if(stateOfBoard[i].includes(' ')) {
			anyEmptyValue = true;
		}

		if (stateOfBoard[i][0] !== ' ' && stateOfBoard[i][0] === stateOfBoard[i][1] && stateOfBoard[i][0] === stateOfBoard[i][2]){
			return stateOfBoard[i][0];
		}
		if (stateOfBoard[0][i] !== ' ' && stateOfBoard[0][i] === stateOfBoard[1][i] && stateOfBoard[0][i] === stateOfBoard[2][i]){
			return stateOfBoard[0][i];
		}
	}

	if (stateOfBoard[1][1] !== ' '){
		if ((stateOfBoard[0][0] === stateOfBoard[1][1] && stateOfBoard[2][2] === stateOfBoard[1][1]) ||
			(stateOfBoard[0][2] === stateOfBoard[1][1] && stateOfBoard[2][0] === stateOfBoard[1][1])){
			return stateOfBoard[1][1];
		}
	}

	if(anyEmptyValue) {
		return 'continue';
	} else {
		return 'tie';
	}
}

function markSpot(row, column) {
	if (stateOfBoard[row][column] === ' ' && currentPlayer === 'X'){
		currentPlayer = 'O';
		setBoxValue(row, column, 'X');
		checkResult();
		$("#info").html("Wait till the computer takes it turn.");
		setTimeout(computerTurn, 1000);
	} else if(stateOfBoard[row][column] !== ' ') {
		alert("Please select empty spot");
	}
}

$("#svg").click(function(event){
	if (currentPlayer === ' '){
		currentPlayer = 'X';
		$("#info").html("Please take your turn. Select any place to put cross.");
	} else if (currentPlayer === 'X'){
		var offset = $(this).offset();
		markSpot(Math.floor((event.pageY - offset.top)/100), Math.floor((event.pageX - offset.left)/100));
	}
});