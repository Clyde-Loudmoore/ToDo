import React from "react";
import "./ToDo.css";
import { DeleteOutlined } from "@ant-design/icons";

function ToDo({
  todo,
  inputValue,
  setInputValue,
  deleteTaskByUuid,
  updateTask,
  editTask,
  setEditTask,
}) {
  const editTodo = () => {
    setInputValue(todo.name);
    updateTask(todo.uuid, inputValue);
  };

  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      setEditTask(null);
      editTodo(todo.uuid);
    }
    if (e.key === "Escape") {
      setEditTask(null);
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
              onClick={() => updateTask(todo.done)}
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
                // onBlur={() => {
                //   setEditTask(null);

                //   // editTodo(todo.uuid);
                // }}
                onKeyDown={(e) => {
                  {
                    handlePressKey(e);
                  }
                }}
              />
            </div>
          ) : (
            <div
              className="list_between"
              onDoubleClick={() => setEditInput(todo)}
            >
              {todo.name}
            </div>
          )}
          {editTask === todo.uuid ? (
            <button
              className="list_save"
              onClick={() => {
                setEditTask(null);
                editTodo(todo.uuid);
              }}
            >
              save
            </button>
          ) : (
            <div className="list_right">
              <button className="list_edit" onClick={() => setEditInput(todo)}>
                edit
              </button>
              <time>{todo.createdAt.substr(11, 8)}</time>
              <DeleteOutlined onClick={() => deleteTaskByUuid(todo.uuid)} />
            </div>
          )}
        </li>
      </ul>
    </div>
  );
}

export default ToDo;
