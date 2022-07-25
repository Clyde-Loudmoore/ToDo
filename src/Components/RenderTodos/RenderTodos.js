import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
  filters,
  currentPage,
  todosPerPages,
  setTodos,
  hangleToggle,
  value,
  setValue,
  sortedTasks,
  axiosDelete,
  axiosPatch,
  setEdit,
  edit,
}) {
  return sortedTasks
    .sort((a, b) => {
      if (filters === 0) return a.createdAt - b.createdAt;
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
          key={todo.uuid}
          todos={todos}
          setTodos={setTodos}
          hangleToggle={hangleToggle}
          value={value}
          setValue={setValue}
          axiosDelete={axiosDelete}
          axiosPatch={axiosPatch}
          setEdit={setEdit}
          edit={edit}
        />
      );
    });
}
export default RenderTodos;
