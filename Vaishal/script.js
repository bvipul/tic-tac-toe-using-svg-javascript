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

function markSpot(row, column) {
	if (stateOfBoard[row][column] === ' ' && currentPlayer === 'X'){
		currentPlayer = 'O';
		setBoxValue(row, column, 'X');
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