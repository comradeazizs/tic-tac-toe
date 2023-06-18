const gameboard = (function () {
   board = new Array(9);
   createPlayer = function (name, marker, wins) {
      return {
         name,
         marker,
         wins
      };
   };
   
   checkWin = function () {
      for (let i = 0; i < 7; i += 3) {
         if (!board[i]) {
            continue;
         } else if (board[i] === board[i + 1] && board[i] === board[i + 2]) {
            return board[i];
         }
      }
      for (let i = 0; i < 3; i++) {
         if (!board[i]) {
            continue;
         } else if (board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return board[i];
         }
      }
      if (board[0] && board[0] === board[4] && board[0] === board[8]) {
         return board[0];
      } else if (board[2] && board[2] === board[4] && board[2] === board[6]) {
         return board[2];
      }
      return false;
   };

   checkDraw = function(){
      if(!board.includes(undefined)){
         return true;
      }
      return false;
   }
   const player1 = createPlayer("Player1", "X", 0);
   const player2 = createPlayer("Player2", "O", 0);

   let currentTurn = player1;
   restart = function () {
      currentTurn = player1;
   };

   let message = document.querySelector(".message");
   let xScore = document.querySelector(".xScore");
   let oScore = document.querySelector(".oScore");

   putMarker = function (index) {
      if (!board[index]) {
         board[index] = currentTurn.marker;
         if (checkWin()) {
            currentTurn.wins++;
            message.textContent = `${currentTurn.marker}  Wins`;
            xScore.textContent = `${player1.wins}`;
            oScore.textContent = `${player2.wins}`;
            clearArr();
            clearCells();
            restart();
            return;
         }else if(checkDraw()){
            message.textContent = `Draw`;
            clearArr();
            clearCells();
            restart();
            return
         }
      }
      currentTurn === player1
         ? (currentTurn = player2)
         : (currentTurn = player1);
      printBoard();
   };

   printBoard = function () {
      let string = "";
      for (let i = 0; i < board.length; i++) {
         if (i % 3 == 0) {
            string += "\n";
         }
         if (!board[i]) {
            string += ` _ `;
         } else {
            string += ` ${board[i]} `;
         }
      }
      console.log(string);
   };

   clearArr = function () {
      for (let i = 0; i < board.length; i++) {
         board[i] = undefined;
      }
   };

   let cells = [...document.querySelectorAll(".cell")];

   clearCells = function () {
      cells.forEach((cell) => {
         cell.classList.remove("X", "O");
      });
   };

   cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
         if (
            !e.target.classList.contains("O") &&
            !e.target.classList.contains("X")
         ) {
            e.target.classList.add(`${currentTurn.marker}`);
            putMarker(e.target.dataset.indexNumber);
         }
      });
   });
   return { putMarker, printBoard, checkWin, clearArr, clearCells };
})();
