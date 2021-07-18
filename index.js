const player = "x"
const ai = "o"
const cells = document.querySelectorAll('[cell]')
let currentBoard = ['', '', '', '', '', '', '', '', '']
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

function start() {
    var ele = document.getElementsByTagName('input');
      
    for(i = 0; i < ele.length; i++) {
          
        if(ele[i].type="radio") {
          
            if(ele[i].checked){
                document.getElementsByClassName('first-message')[0].style.display = 'none';
                ele[i].value == 1 ? game(player) : game(ai)
                return
            }
        }
    }
}

function game(firstPlayer) {
    cells.forEach(element => {
        element.addEventListener('click', handleClick, {once: true})
    });  

    if (firstPlayer === ai){
        aiMove()
    }  
}

function handleClick(e) {
    const cell = e.target
    const id = parseInt(cell.id)

    if (currentBoard[id] === ''){
        currentBoard[id] = player;
        place(cell, player);

        if (checkWin(currentBoard, player)) {
            document.getElementsByClassName('last-message')[0].classList.add('show')
            document.getElementsByClassName('result')[0].innerHTML = "You Win!!"
        }
        else if (checkDraw(currentBoard)) {
            document.getElementsByClassName('last-message')[0].classList.add('show')
            document.getElementsByClassName('result')[0].innerHTML = "It's a Draw!!"
        }
        else {
            aiMove()
        }
    } 
    console.log(currentBoard)
}

function place(cell, turn) {
    cell.classList.add(turn);
}

function checkWin(currentBoard, turn) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return currentBoard[index] === turn;
      })
    })
  }

function checkDraw(currentBoard) {
    return [...currentBoard].every(cell => {
        return cell !== ''
    })
}

function aiMove() {
    let board = [...currentBoard]
    let bestScore = -Infinity
    let bestMove = -1
    for (let i = 0; i < 9; i++) {

        if (currentBoard[i] === '') {
            board[i] = ai;
            let best = minimax(board, false);
            board[i] = '';
            if (best > bestScore) {
                bestMove = i;
                bestScore = best;
            }
        }
    }

    if (bestMove > -1) {
        currentBoard[bestMove] = ai;
        var cell = document.getElementById(bestMove)
        place(cell, ai)

        if (checkWin(currentBoard, ai)) {
            document.getElementsByClassName('last-message')[0].classList.add('show')
            document.getElementsByClassName('result')[0].innerHTML = "You Lose"
        } else if (checkDraw(currentBoard)){
            document.getElementsByClassName('last-message')[0].classList.add('show')
            document.getElementsByClassName('result')[0].innerHTML = "It's a Draw!!"
        }
    }



}

function minimax(currentBoard, isMaximizing){
    let board = [...currentBoard]
    let best
    if (checkWin(board, player)) {
        return -1;
    } else if (checkWin(board, ai)) {
        return 1;
    } else if (checkDraw(board)) {
        return 0;
    } else if (isMaximizing) {
        best = -Infinity
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = ai;
                best = Math.max(minimax(board, false), best); 
                board[i] = '';
            }
        }

        return best;

    } else {
        best = Infinity
        for (let i = 0; i < 9; i++) {
            if (board[i] == '') {
                board[i] = player;
                best = Math.min(minimax(board, true), best);
                board[i] = '';
            }
        }
        return best
    }
}