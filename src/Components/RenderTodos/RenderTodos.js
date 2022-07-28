import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
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
  return todos.map((todo) => {
    return (
      <ToDo
        todo={todo}
        key={todo.uuid}
        todos={todos}
        setTodos={setTodos}
        inputValue={inputValue}
        setInputValue={setInputValue}
        deleteTaskById={deleteTaskById}
        updateTask={updateTask}
        editTask={editTask}
        setEditTask={setEditTask}
        axiosPatchDone={axiosPatchDone}
        getTasksList={getTasksList}
      />
    );
  });
}
export default RenderTodos;
