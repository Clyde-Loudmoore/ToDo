import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
  setTodos,
  hangleToggle,
  meaning,
  setMeaning,
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
          meaning={meaning}
          setMeaning={setMeaning}
          axiosDelete={axiosDelete}
          axiosPatch={axiosPatch}
          setEdit={setEdit}
          edit={edit}
        />
      );
    });
}
export default RenderTodos;
