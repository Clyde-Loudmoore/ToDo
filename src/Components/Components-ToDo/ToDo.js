import React, { useState } from "react";
import "./ToDo.css";
import Delete from "../../img/delete.png";

function ToDo({ todos, todo, toggleTask, removeTask, setTodos, userInput }) {
  const date =
    new Date().getDate() +
    "/" +
    `${new Date().getMonth() + 1}` +
    "/" +
    new Date().getFullYear();

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const editTodo = (id, task) => {
    setEdit(true);
    setValue(task);
  };

  const saveTodo = (e, id) => {
    const title = value;
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.task = title;
      }
      return todo;
    });
    setTodos(newTodo);
    setEdit(null);
  };

  const handlePressKey = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(e, id);
    }
    if (e.key === "Escape") {
      setEdit(false);
    }
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
                autoFocus
                className="list_change"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onKeyDown={(e) => handlePressKey(e, todo.id)}
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
