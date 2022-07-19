import React from "react";
import "./ToDo.css";
import Delete from "../../img/delete.png";

function ToDo({
  todos,
  todo,
  toggleTask,
  removeTask,
  setTodos,
  value,
  setValue,
  editTaskOnButton,
}) {
  const editTodo = (id) => {
    const changedStatusInput = todos.map((todo) =>
      todo.id === id ? { ...todo, edit: !todo.edit } : todo
    );
    setTodos(changedStatusInput);

    editTaskOnButton(id);
  };

  const handlePressKey = (e, id) => {
    if (e.key === "Enter") {
      editTaskOnButton(id, value);
    }
    if (e.key === "Escape") {
      editTodo(id);
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
          {todo.edit ? (
            <div>
              <input
                autoFocus
                className="list_change"
                onChange={(e) => setValue(e.target.value)}
                value={value || todo.task}
                onKeyDown={(e) => handlePressKey(e, todo.id)}
                placeholder={todo.task}
              />
            </div>
          ) : (
            <div className="list_between">
              <p>{todo.task}</p>
            </div>
          )}
          {todo.edit ? (
            <button
              className="list_save"
              onClick={() => editTaskOnButton(todo.id, value)}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button className="list_edit" onClick={() => editTodo(todo.id)}>
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
