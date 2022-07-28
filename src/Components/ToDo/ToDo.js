import React from "react";
import "./ToDo.css";
import { DeleteOutlined } from "@ant-design/icons";

function ToDo({
  todos,
  todo,
  setTodos,
  inputValue,
  setInputValue,
  deleteTaskById,
  updateTask,
  editTask,
  setEditTask,
  axiosPatchDone,
  getTasksList,
}) {
  const editTodo = (uuid) => {
    setTodos(
      todos.map((todo) =>
        todo.uuid === uuid ? { ...todo, edit: !todo.edit } : todo
      )
    );
    setInputValue(todo.name);
    updateTask(todo.uuid, inputValue);
  };

  const handlePressKey = (e, uuid) => {
    if (e.key === "Enter") {
      setEditTask(null);
      updateTask(todo.uuid, inputValue);
    }
    if (e.key === "Escape") {
      setEditTask(null);
      editTodo(uuid);
    }
  };

  const setEditInput = (todo) => {
    setInputValue(todo.name);
    setEditTask(todo.uuid);
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
                getTasksList();
              }}
              readOnly
            />
          </div>
          {editTask === todo.uuid ? (
            <div>
              <input
                autoFocus
                key={todo.uuid}
                className="list_change"
                onChange={(e) => setInputValue(e.target.value)}
                defaultValue={inputValue}
                onBlur={() => {
                  setEditTask(null);
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
          {editTask === todo.uuid ? (
            <button
              className="list_save"
              onClick={() => updateTask(todo.uuid, inputValue)}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button className="list_edit" onClick={() => setEditInput(todo)}>
                edit
              </button>
              <time>{todo.createdAt.substr(11, 8)}</time>
              <DeleteOutlined onClick={() => deleteTaskById(todo.uuid)} />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
