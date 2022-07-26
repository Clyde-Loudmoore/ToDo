import React from "react";
import "./ToDo.css";
import Delete from "../../img/delete.png";

function ToDo({
  todos,
  todo,
  hangleToggle,
  setTodos,
  meaning,
  setMeaning,
  axiosDelete,
  axiosPatch,
  edit,
  setEdit,
}) {
  const editTodo = (uuid) => {
    setTodos(
      todos.map((todo) =>
        todo.uuid === uuid ? { ...todo, edit: !todo.edit } : todo
      )
    );
    setMeaning(todo.task);
    axiosPatch(todo.uuid, meaning);
  };

  const handlePressKey = (e, uuid) => {
    if (e.key === "Enter") {
      axiosPatch(todo.uuid, meaning);
    }
    if (e.key === "Escape") {
      editTodo(uuid);
    }
  };

  const setEditInput = (uuid) => {
    setMeaning(todo.name);
    setEdit(uuid);
  };

  return (
    <div key={todo.uuid} className="list">
      <ul className="todo">
        <li>
          <div className="list_left">
            <input
              type="checkbox"
              className="done"
              checked={todo.done}
              onClick={() => hangleToggle(todo.done, todo.uuid)}
              readOnly
            />
          </div>
          {edit === todo.uuid ? (
            <div>
              <input
                autoFocus
                key={todo.uuid}
                className="list_change"
                onChange={(e) => setMeaning(e.target.value)}
                value={meaning}
                onBlur={() => editTodo(todo.uuid)}
                onKeyDown={(e) => handlePressKey(e, todo.uuid)}
              />
            </div>
          ) : (
            <div className="list_between">
              <p>{todo.name}</p>
            </div>
          )}
          {edit === todo.uuid ? (
            <button
              className="list_save"
              onClick={() => axiosPatch(todo.uuid, meaning)}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button
                className="list_edit"
                onClick={() => setEditInput(todo.uuid)}
              >
                edit
              </button>
              <time>{todo.createdAt.substr(11, 8)}</time>
              <button
                className="list_delete"
                type="button"
                onClick={() => axiosDelete(todo.uuid)}
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
