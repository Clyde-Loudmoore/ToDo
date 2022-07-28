import React from "react";
import "./ToDo.css";
import { DeleteOutlined } from "@ant-design/icons";

function ToDo({
  todos,
  todo,
  setTodos,
  meaning,
  setMeaning,
  deleteAxios,
  patchAxios,
  edit,
  setEdit,
  axiosPatchDone,
  getAxios,
}) {
  const editTodo = (uuid) => {
    setTodos(
      todos.map((todo) =>
        todo.uuid === uuid ? { ...todo, edit: !todo.edit } : todo
      )
    );
    setMeaning(todo.name);
    patchAxios(todo.uuid, meaning);
  };

  const handlePressKey = (e, uuid) => {
    if (e.key === "Enter") {
      setEdit(null);
      patchAxios(todo.uuid, meaning);
    }
    if (e.key === "Escape") {
      setEdit(null);
      editTodo(uuid);
    }
  };

  const setEditInput = (todo) => {
    setMeaning(todo.name);
    setEdit(todo.uuid);
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
              onClick={async () => {
                await axiosPatchDone(todo.done, todo.uuid);
                getAxios();
              }}
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
                defaultValue={meaning}
                onBlur={() => {
                  setEdit(null);
                  editTodo(todo.uuid);
                }}
                onKeyDown={(e) => {
                  handlePressKey(e, todo.uuid);
                }}
              />
            </div>
          ) : (
            <div
              className="list_between"
              onDoubleClick={() => setEditInput(todo.uuid)}
            >
              {todo.name}
            </div>
          )}
          {edit === todo.uuid ? (
            <button
              className="list_save"
              onClick={() => patchAxios(todo.uuid, meaning)}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button className="list_edit" onClick={() => setEditInput(todo)}>
                edit
              </button>
              <time>{todo.createdAt.substr(11, 8)}</time>
              <DeleteOutlined onClick={() => deleteAxios(todo.uuid)} />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
