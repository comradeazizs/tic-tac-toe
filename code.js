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
         } else if (board[i] === board[i + 1] && board[i] === board[i + 1]) {
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
      } else if (board[2] && board[2] === board[4] && board[2] === board[6]){
         return board[2];
      }
         return false;
   };
   const player1 = createPlayer("Aziz", "X", 0);
   const player2 = createPlayer("Alex", "O", 0);
   let currentTurn = player1;

   putMarker = function (index) {
      if (!board[index]) {
         board[index] = currentTurn.marker;
         currentTurn === player1
            ? (currentTurn = player2)
            : (currentTurn = player1);
         printBoard();
      }
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
   return { putMarker, printBoard, checkWin };
})();



