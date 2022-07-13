import React from "react";
import Delete from "./img/delite.png";

function ToDo({ todo, toggleTask, removeTask }) {
  const date = new Date().toLocaleTimeString();

  return (
    <div key={todo.id} className="list">
      <ul className="todo">
        <li>
          <div className="list_left">
            <input
              type="checkbox"
              className="done"
              checked={todo.status}
              onClick={() => toggleTask(todo.id)}
              readOnly
            />
            <p>{todo.task}</p>
          </div>
          <div className="list_right">
            <time>{date}</time>
            <button
              className="delete"
              type="button"
              onClick={() => removeTask(todo.id)}
            >
              <img src={Delete} />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
