import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  Y: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derviedWinner(player, gameBoard) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [player, setPlayer] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derviedWinner(player, gameBoard);

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurn) => {
      const playerTurn = derivedActivePlayer(prevTurn);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: playerTurn }, ...prevTurn];
      return updatedTurns;
    });
  }

  function restartMatch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prevPlayer) => {
      return { ...prevPlayer, [symbol]: newName };
    });
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange} />
          <Player initialName={PLAYERS.Y} symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver win={winner} onRestart={restartMatch} />}
        <GameBoard board={gameBoard} onActivePlayer={activePlayer} onSelectedSquare={handleSelectedSquare} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
