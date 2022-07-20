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
  saveTodo,
  edit,
  setEdit,
}) {
  const editTodo = (id) => {
    setTodos([
      ...todos].map((todo) =>
        todo.id === id ? { ...todo, edit: !todo.edit } : todo
      ),
    );
    saveTodo(id);
    setEdit(null);
    console.log(todo);
  };

  const handlePressKey = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(id, value);
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
                key={todo.id}
                autoFocus
                className="list_change"
                onChange={(e) => setValue(e.target.value)}
                value={value || todo.task}
                onKeyDown={(e) => handlePressKey(e, todo.id)}
                onBlur={()=> editTodo(todo.id)}
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
              onClick={() => saveTodo(todo.id, value)}
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
