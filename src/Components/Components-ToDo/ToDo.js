import React, { useState } from "react";
import "./ToDo.css";
import Delete from "../../img/delete.png";


function ToDo({ todos, todo, toggleTask, removeTask, setTodos }) {
  // const date =
  //   new Date().getDate() +
  //   "/" +
  //   `${new Date().getMonth() + 1}` +
  //   "/" +
  //   new Date().getFullYear(); //shit
  
  // const date = new Date();


  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const editTodo = (task) => {
    setEdit(true);
    setValue(task);
  };

  const saveTodo = (id) => {
    const title = value;
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, task: title } : todo
      ),
    ]);
    setEdit(false);
  };

  const handlePressKey = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(id);
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
            <div className="list_between">
              <p>{todo.task}</p>
            </div>
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
              <button className="list_edit" onClick={() => editTodo(todo.task)}>
                edit
              </button>
              <time>{todo.createdAt.toLocaleTimeString()}</time>
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
