import React, { useState } from "react";
import Delete from "./img/delite.png";

function ToDo({ todos, todo, toggleTask, removeTask, setTodos }) {
  const date = new Date().toLocaleTimeString();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const editTodo = (id, task) => {
    setEdit(true);
    setValue(task);
  };

  const saveTodo = (id, value) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.task = value;
      }
      return todo;
    });
    setTodos(newTodo);
    setEdit(null);
  };

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
          </div>
          {edit ? (
            <div>
              <input
                className="list_change"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
          ) : (
            <p>{todo.task}</p>
          )}
          {edit ? (
            <button
              className="list_save"
              onClick={() => saveTodo(todo.id, value)}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button
                className="list_edit"
                onClick={() => editTodo(todo.id, todo.task)}
              >
                edit
              </button>
              <time>{date}</time>
              <button
                className="list_delete"
                type="button"
                onClick={() => removeTask(todo.id)}
              >
                <img src={Delete} alt="delete" />
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
