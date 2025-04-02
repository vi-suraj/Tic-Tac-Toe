export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((logs) => (
        <li key={`${logs.square.row}${logs.square.col}`}>{`${logs.player} selected ${logs.square.row},${logs.square.col}.`}</li>
      ))}
    </ol>
  );
} 
