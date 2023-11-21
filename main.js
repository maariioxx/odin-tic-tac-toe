

const Gameboard = (() => {
    grid = [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    getGrid = (index) => {
        return grid[index];
    }

    winnerSelections = [[0, 1, 2], [3, 4 , 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    createPlayer = function(name, mark, turn, selections){
        return { name, mark, turn, selections }
    },

    player1 = createPlayer("Player 1", "X", true, []),

    player2 = createPlayer("Player 2", "O", false, [])

    
    return { getGrid, winnerSelections }
})();

const Game = (() => {
    gameField = document.querySelectorAll(".gameboard-field"),
    buttons = document.querySelector(".buttons"),
    restartBtn = document.querySelector(".restart-btn"),
    message = document.querySelector(".message"),

    message.textContent = `Game started! ${player1.mark} turn!`
    winner = false,
    draw = false,
    turns = 0,
    restart_created = false,
    
    gameField.forEach(field => {
        field.addEventListener("click", (e) => {
            e.textContent = Gameboard.getGrid(e.target.dataset.index);
            startTurn(field, e);
        })
    }),

    startTurn = function(field, e){
        if(winner == false && draw == false){
            selection = Number(e.target.dataset.index)
            if(player1.turn == true){
                if (grid[selection] === " "){
                    player1.selections.push(selection);
                    console.log(player1.selections)
                    grid[selection] = player1.mark;
                    player1.turn = false;
                    player2.turn = true;
                    sign = document.createElement("span")
                    sign.classList.add("material-symbols-outlined")
                    sign.textContent = "close";
                    field.appendChild(sign);
                    message.textContent = `${player2.mark} turn!`;
                    checkWinner();
                    checkDraw();
                    
                }  
            }
            else if(player2.turn == true){
                if (grid[selection] === " "){
                    player2.selections.push(selection);
                    grid[selection] = player2.mark;
                    player1.turn = true;
                    player2.turn = false;
                    sign = document.createElement("span")
                    sign.classList.add("material-symbols-outlined")
                    sign.textContent = "circle"
                    field.appendChild(sign);
                    message.textContent = `${player1.mark} turn!`;
                    checkWinner();
                    checkDraw();
                    
                }
            }  
        }
    },   
    
    checkWinner = function(){
            for(let combo of Gameboard.winnerSelections){
                if(combo.every((el) => player1.selections.includes(el))){
                    message.textContent = `${player1.name} wins! Congratulations`
                    return winner = true;
                }
                else if(combo.every((el) => player2.selections.includes(el))){
                    message.textContent = `${player2.name} wins! Congratulations`
                    return winner = true;
                }
            }
    },
    
    checkDraw = function(){
            turns++;
            if(turns == 9 && winner == false){
                message = "That's a draw!"
            }
    },
    
    resetGame = () => {
        grid.fill(" ", 0);
        gameField.forEach(field => {
            field.innerHTML = " ";
        });
        player1.selections = [];
        player2.selections = [];
        winner = false;
        draw = false;
        turns = 0;
        player1.turn = !player1.turn
        console.log(player1.turn)
        player2.turn = !player2.turn;
        message.textContent = "Click start!"
    },

    restartBtn.addEventListener("click", () => {
        resetGame();
    })

    
});        
        


const displayController = (() => {
    startGameBtn = document.querySelector(".start-game-btn"),
    
    startGameBtn.addEventListener("click", () => {
        Game();
        console.log("Game started!")
    })

    
})();
    
    



