let game = (function(){

    //variables
    let user = {alias:"", id:"", token:"", isWinner:false};
    let rival = {alias:"", id:"", token:"", isWinner:false};
    let cells = document.querySelectorAll(".cell");
    let playerButtons = document.querySelectorAll(".playerButton");
    let currentPlayer = null;
    let gameActive = true;
    
    //function to choose player
    let choosePlayer = function(){
        user.alias = this.textContent;
        user.id = this.id;
        user.token = this.value;
        document.querySelector(".playerTitle").textContent  = "Selected: " + this.textContent;

        //assign rival values and disable buttons
        for(let button of playerButtons){
            if(button.id !== this.id){
                rival.alias = button.textContent;
                rival.id = button.id;
                rival.token = button.value;
            };
            button.disabled = true;
        }

        //Set starting player
        currentPlayer = user;

        //activate cells
        for(let c of cells){
            c.disabled = false;
        };

        //start the game
        play();
    };

    //Reset function
    let restart = function(){
        //reset players 
        user = {alias:"", id:"", token:"", isWinner:false};
        rival = {alias:"", id:"", token:"", isWinner:false};
        currentPlayer = null;
        gameActive = false;

        //Reset cells 
        for(let c of cells){
            c.disabled = true;
            c.textContent = "";
            c.id = "";
            c.style.pointerEvents = "auto";
        };

        //reset player buttons 
        for(let button of playerButtons){
            button.disabled = false;
        };

        //Reset title
        document.querySelector(".playerTitle").textContent = "Select your player";

        //remove winner message
        let winnerMessage = document.querySelector(".winnerMessage");
        if(winnerMessage){
            winnerMessage.remove();
        }
        let board = document.querySelector(".board");
        board.style.pointerEvents = "auto";
    };
    
    //function that starts this
    let init = function(){
        let restartButton = document.querySelector(".restartButton");
        restartButton.addEventListener("click", restart);

        for(let c of cells){
            c.disabled = true;
            c.textContent = "";//Clear any existing content
            c.style.pointerEvents = "auto"; //reset pointer events
        };

        for(let button of playerButtons){
            button.addEventListener("click", choosePlayer);
        }
    };

    //function to check winner
    let checkWinner = function(){
        function checkLine(a,b,c){
            return cells[a].textContent &&
                   cells[a].textContent === cells[b].textContent &&
                   cells[b].textContent === cells[c].textContent;
        }

        //check all winning combinations
        if(checkLine(0,1,2) || //top row
           checkLine(3,4,5) || //middle row
           checkLine(6,7,8) || //bottom row
           checkLine(0,3,6) || //left column
           checkLine(1,4,7) || //middle column
           checkLine(2,5,8) || //right column
           checkLine(0,4,8) || //diagonal
           checkLine(2,4,6)){  //diagonal
            currentPlayer.isWinner = true;
            return true;
        }

        //check for tie
        let isTie = true;
        for(let cell of cells){
            if(!cell.textContent){
                isTie = false;
                break;
            }
        }
        return isTie;
    };

    //function to handle cell click
    let handleCellClick = function(){
        if(!gameActive) return;

        //Mark the cell
        this.textContent = currentPlayer.token;
        this.id = currentPlayer.id;
        this.style.pointerEvents = "none";

        //check for winner or tie
        if(checkWinner()){
            gameActive = false;
            endGame(currentPlayer.isWinner ? currentPlayer : null);
            return;
        }

        //switch players
        currentPlayer = (currentPlayer === user) ? rival : user;
    };

    //function to setup game board
    let setupBoard = function(){
        for(let c of cells){
            c.addEventListener("click", handleCellClick);
        }
    };

    let play = function(){
        gameActive = true;
        setupBoard();
    };

    let endGame = function(winner){
        let board = document.querySelector(".board");
        board.style.pointerEvents = "none";
        let winnerMessage = document.createElement("div");
        winnerMessage.classList.add("winnerMessage");

        if(winner){
            winnerMessage.textContent = winner.alias + " wins!";
        }else{
            winnerMessage.textContent = "It's a tie!";
        }

        document.body.appendChild(winnerMessage);
        let closeMessage = document.createElement("button");
        closeMessage.textContent = "X";
        closeMessage.classList.add("closeMessage");
        closeMessage.addEventListener("click", ()=>winnerMessage.style.display = "none");
        winnerMessage.appendChild(closeMessage);
        
    };

    //make init available globally
    return{
        init:init,
        restart: restart
    };

})();

//start game when the page loads
game.init();

/*
//declaration of variables
let player = {
    alias:"", id:""
};
let rival = {
    alias:"", id:""
};
let playerButtons = document.querySelectorAll(".playerButton");
let selected = document.querySelector(".playerTitle");

//function: decide player roles
function selectPlayer(){
    player.alias = this.textContent;
    player.id = this.id;
    selected.textContent = "Selected: " + this.textContent;
    
    for(let button of playerButtons){
        if(button.id!=this.id){
            rival.alias = button.textContent;
            rival.id = button.id;
        }
        button.disabled =true;
        button.style.color = "#000";
        button.style.border = "none";
    }
}

//loop assign button for players
for(let button of playerButtons){
    button.addEventListener("click", selectPlayer);
}

function active(active){
    let activePlayer = {
        alias:"", 
        id:"" 
    };
    activePlayer.alias = this.alias;
    activePlayer.alias = this.id;
    return activePlayer;
}

function game(){
    let turn = active(player);
    
}

*/