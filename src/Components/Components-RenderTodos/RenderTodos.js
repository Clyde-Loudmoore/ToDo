import React from "react";
import ToDo from "../Components-ToDo/ToDo";

function RenderTodos({
  todos,
  filters,
  currentPage,
  todosPerPages,
  setTodos,
  hangleToggle,
  removeTask,
  value,
  setValue,
  edit,
  setEdit,
  saveTodo,
  sortedTasks,
}) {


  return sortedTasks
    .sort((a, b) => {
      if (filters.sort === 0) return a.createdAt - b.createdAt;
      return b.createdAt - a.createdAt;
    })
    .slice(
      (currentPage - 1) * todosPerPages,
      (currentPage - 1) * todosPerPages + todosPerPages
    )
    .map((todo) => {
      return (
        <ToDo
          todo={todo}
          key={todo.id}
          todos={todos}
          setTodos={setTodos}
          hangleToggle={hangleToggle}
          removeTask={removeTask}
          value={value}
          setValue={setValue}
          edit={edit}
          setEdit={setEdit}
          saveTodo={saveTodo}
        />
      );
    });
}
export default RenderTodos;
