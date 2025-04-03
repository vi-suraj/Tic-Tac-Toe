import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {

const [player,setPlayer] = useState({
  'X':'Player 1',
  'O':'Player 2'
})

  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map((innerArray)=>[...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }

  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = derivedActivePlayer(gameTurns);

  function handleSelectedSquare(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurn) => {
      const playerTurn = derivedActivePlayer(prevTurn);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: playerTurn }, ...prevTurn];
      return updatedTurns;
    });
  }

  function restartMatch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange (symbol,newName){
    setPlayer((prevPlayer)=>{
      return {...prevPlayer,
        [symbol]:newName
      }
    })
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver win={winner} onRestart = {restartMatch}/>}
        <GameBoard board={gameBoard} onActivePlayer={activePlayer} onSelectedSquare={handleSelectedSquare} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
