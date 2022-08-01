import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
  setTodos,
  inputValue,
  setInputValue,
  deleteTaskByUuid,
  updateTask,
  editTask,
  setEditTask,
  getTasksList,
  updateTaskDone,
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
        deleteTaskByUuid={deleteTaskByUuid}
        updateTask={updateTask}
        editTask={editTask}
        setEditTask={setEditTask}
        getTasksList={getTasksList}
        updateTaskDone={updateTaskDone}
      />
    );
  });
}
export default RenderTodos;
