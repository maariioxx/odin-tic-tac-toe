

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

    winner = false,
    draw = false,
    turns = 0,
    
    gameField.forEach(field => {
        field.addEventListener("click", (e) => {
            e.textContent = Gameboard.getGrid(e.target.dataset.index);
            startGame(field, e);
        })
    }),

    startGame = function(field, e){
        if(winner == false && draw == false){
            selection = Number(e.target.dataset.index)
            if(player1.turn == true){
                if (grid[selection] === " "){
                    player1.selections.push(selection);
                    console.log(player1.selections)
                    grid[selection] = player1.mark;
                    checkWinner();
                    checkDraw();
                    player1.turn = false;
                    player2.turn = true;
                    sign = document.createElement("span")
                    sign.classList.add("material-symbols-outlined")
                    sign.textContent = "close"
                    field.appendChild(sign)
                }  
            }
            else if(player2.turn == true){
                if (grid[selection] === " "){
                    player2.selections.push(selection);
                    grid[selection] = player2.mark;
                    checkWinner();
                    checkDraw();
                    player1.turn = true;
                    player2.turn = false;
                    sign = document.createElement("span")
                    sign.classList.add("material-symbols-outlined")
                    sign.textContent = "circle"
                    field.appendChild(sign)
                }
            }  
        }
    },        
    

        checkWinner = function(){
            for(let combo of Gameboard.winnerSelections){
                if(combo.every((el) => player1.selections.includes(el))){
                    console.log(`${player1.name} wins!`)
                    return winner = true;
                }
                else if(combo.every((el) => player2.selections.includes(el))){
                    console.log(`${player2.name} wins!`)
                    return winner = true;
                }
            }
        },
    
        checkDraw = function(){
            turns++;
            if(turns == 9 && winner == false){
                console.log("That's a draw!");
                resetGame();
            }
        }
    
        resetGame =  function(){
            grid.fill(" ", 0);
            if(player1.turn == false) player1 ? true : false;
            else if(player2.turn == false) player2 ? true : false;
        }
});        
        


const displayController = (() => {
    startGameBtn = document.querySelector(".start-game-btn")
    

    startGameBtn.addEventListener("click", () => {
        Game();
        console.log("Game started!")
    })
    
    
})();
    
    



