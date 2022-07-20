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
}) {
  const filteredTodos = todos.filter((todo) => {
    if (filters.status === "all") return true;
    else if (filters.status === "done" && todo.status) {
      return true;
    } else if (filters.status === "undone" && !todo.status) {
      return true;
    }
  });
  return filteredTodos
    .sort((a, b) => {
      if (filters.sort === "dateAsc") return a.createdAt - b.createdAt;
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
          toggleTask={hangleToggle}
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
