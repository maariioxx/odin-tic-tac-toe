
const Gameboard = (() => {
    grid = [" ", " ", " ", " ", " ", " ", " ", " ", " "],

    winnerSelections = [[0, 1, 2], [3, 4 , 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    createPlayer = function(name, mark, turn, selections){
        return { name, mark, turn, selections }
    },

    player1 = createPlayer("Player 1", "X", true, []),

    player2 = createPlayer("Player 2", "O", false, []),

    winner = false,
    draw = false,
    turns = 0,
    
    Game = (function(){
   
    while(winner == false && draw == false){
            if(player1.turn == true){
                selection = prompt(`Choose a number between 1 and 9 ${player1.name}`)
                if (grid[selection - 1] === " "){
                    player1.selections.push(selection - 1);
                    grid[selection - 1] = player1.mark;
                    checkWinner();
                    checkDraw();
                    player1.turn = false;
                    player2.turn = true;
                } else {
                    selection = prompt(`Choose a number between 1 and 9 ${player1.name}`)
                }
                
            }
            else if(player2.turn == true){
                selection = prompt(`Choose a number between 1 and 9 ${player2.name}`)
                if (grid[selection - 1] === " "){
                    player2.selections.push(selection - 1);
                    grid[selection - 1] = player2.mark;
                    checkWinner();
                    checkDraw();
                    player1.turn = true;
                    player2.turn = false;
                } else {
                    selection = prompt(`Choose a number between 1 and 9 ${player2.name}`)
                }
            }
            displayConsoleGame()
        }
    });
    displayConsoleGame = function(){
        console.log(`${grid[0]} | ${grid[1]} | ${grid[2]}
―――――――――
${grid[3]} | ${grid[4]} | ${grid[5]}
―――――――――
${grid[6]} | ${grid[7]} | ${grid[8]} `)
    },

    checkWinner = function(){
        for(let combo of winnerSelections){
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
    Game()
    
});

Gameboard()



