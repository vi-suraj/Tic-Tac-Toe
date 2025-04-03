export default function GameOver({ win, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {win && <p>You Won {win}!</p>}
      {!win && <p>Match Draw</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}
