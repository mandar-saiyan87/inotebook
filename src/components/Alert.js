import React, { useContext } from "react";
import { NoteContext } from '../context/notes/NoteContext';


function Alert() {

  const context = useContext(NoteContext);
  const { alert } = context;

  function capitalize(word) {
    if (word === 'danger') {
      word = 'error'
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }

  return (
    <div style={{ height: "40px" }}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          <strong>{capitalize(alert.type)}: </strong>
          {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
