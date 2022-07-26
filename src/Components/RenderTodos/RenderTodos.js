import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
  setTodos,
  hangleToggle,
  value,
  setValue,
  axiosDelete,
  axiosPatch,
  setEdit,
  edit,
}) {
  return todos.map((todo) => {
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
