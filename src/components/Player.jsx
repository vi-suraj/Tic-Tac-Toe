import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditClick() {
    setIsEditing((edit) => !edit);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayer = <span className="player-name">{playerName}</span>;
  //   let editBtn = 'Edit';

  if (isEditing) {
    editablePlayer = <input type="text" required value={playerName} onChange={handleChange}></input>;
    // editBtn="Save";
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayer}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
