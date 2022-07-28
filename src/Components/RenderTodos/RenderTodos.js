import React from "react";
import ToDo from "../ToDo/ToDo";

function RenderTodos({
  todos,
  setTodos,
  meaning,
  setMeaning,
  deleteAxios,
  patchAxios,
  setEdit,
  edit,
  axiosPatchDone,
  getAxios,
}) {
  return todos.map((todo) => {
    return (
      <ToDo
        todo={todo}
        key={todo.uuid}
        todos={todos}
        setTodos={setTodos}
        meaning={meaning}
        setMeaning={setMeaning}
        deleteAxios={deleteAxios}
        patchAxios={patchAxios}
        setEdit={setEdit}
        edit={edit}
        axiosPatchDone={axiosPatchDone}
        getAxios={getAxios}
      />
    );
  });
}
export default RenderTodos;
