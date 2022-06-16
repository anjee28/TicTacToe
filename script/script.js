const gameBoard = (() => {
    const A = ['','','','','','','','',''];
    return A;
})();

function createUser (name, marker, color) {

    const mark = function(markId) {
        gameBoard[markId] = marker;
        console.log('marked!!');
    }

    let user = {
        name,
        marker,
        color,
        mark
    }
    
    return user;
}

const player1 = createUser('player1','X','red');
const player2 = createUser('player2','O','blue');

var elements = document.querySelectorAll('.grid');

for(var i=0; i<elements.length; i++){

    elements[i].setAttribute('id',i);
}

let toggler = 1;

elements.forEach((div) => {
    
    div.addEventListener('click', () => {       
        if (gameBoard[div.id] !== ''){
            return;
        }
        else {
            if (toggler === 1) {
                toggler = 0;
                //div.innerHTML ='X';
                player1.mark(div.id);
                checkBoard(player1);               
            }
            else if (toggler === 0) {
                toggler = 1;
                //div.innerHTML = 'O';
                player2.mark(div.id);
                checkBoard(player2);    
            }
        }

    renderMarks();
    });
    
});

function renderMarks() {
    for(i = 0; i < gameBoard.length; i++){
        document.getElementById(i).innerHTML = gameBoard[i];
        //document.getElementById(i).innerHTML = i;
    }
}

/* Winning conditions:
0   1   2
3   4   5
6   7   8
0   3   6
1   4   7
2   5   8
0   4   8
2   4   6*/

let winningConditions = [1,2,3,3,4,5,6,7,8,9]
winningConditions[1] = [0,1,2];

function checkBoard(player) {
    const m = player.marker
    if(
        (gameBoard[0] === m && gameBoard[1] === m && gameBoard[2] === m) ||
        (gameBoard[3] === m && gameBoard[4] === m && gameBoard[5] === m) ||
        (gameBoard[6] === m && gameBoard[7] === m && gameBoard[8] === m) ||
        (gameBoard[0] === m && gameBoard[3] === m && gameBoard[6] === m) ||
        (gameBoard[1] === m && gameBoard[4] === m && gameBoard[7] === m) ||
        (gameBoard[2] === m && gameBoard[5] === m && gameBoard[8] === m) ||
        (gameBoard[0] === m && gameBoard[4] === m && gameBoard[8] === m) ||
        (gameBoard[2] === m && gameBoard[4] === m && gameBoard[6] === m)
      ) {
          console.log(player.name + ' wins')
          document.getElementById('grid').style.background = player.color;
      }
}