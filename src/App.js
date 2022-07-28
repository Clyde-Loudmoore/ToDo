import React, { useEffect, useState } from "react";
import "./App.css";

import {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosPatchDone,
  axiosDelete,
} from "./Components/API/API";

import swal from "sweetalert";

import ToDoForm from "./Components/ToDoForm/ToDoForm";
import Pagination from "./Components/Pagination/Pagination";
import Sort from "./Components/Sort/Sort";
import RenderTodos from "./Components/RenderTodos/RenderTodos";

const todosPerPages = 5;

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [filters, setFilters] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState();
  const [userInput, setUserInput] = useState("");
  const [meaning, setMeaning] = useState("");
  const [todoFilter, setTodoFilter] = useState("");

  const getAxios = async () => {
    try {
      const response = await axiosGet(todoFilter, filters, currentPage);

      setTodos(response.data.tasks);
      setPagesCount(response.data.count);
    } catch (err) {
      swal(err.message);
    }
  };

  const postAxios = async (task) => {
    try {
      await axiosPost(task);
    } catch (err) {
      swal("ERROR 400:", "Task not created");
    }
    getAxios();
  };

  const patchAxios = (done, uuid) => {
    axiosPatch(done, uuid)
      .then(() => {
        saveTodo(uuid);
        getAxios();
      })
      .catch((error) => {
        console.error(error);
        swal("ERROR 400:", "Task not created, write something..");
      });
  };

  const deleteAxios = (uuid) => {
    axiosDelete(uuid)
      .then((response) => {
        console.log(response);
        getAxios();
      })
      .catch((error) => {
        swal("ERROR 404:", "Task not found");
      });
  };

  const saveTodo = (uuid) => {
    const title = meaning;
    if (title) {
      setTodos(
        todos.map((todo) =>
          todo.uuid === uuid ? { ...todo, task: title, edit: false } : todo
        )
      );
    }
  };

  const paginate = (e) => {
    setCurrentPage(e);
  };

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        name: userInput,
      };
      postAxios(newItem);
    }
  };

  useEffect(() => {
    getAxios();
  }, [todoFilter, currentPage, filters]);

  return (
    <div className="App">
      <div className="base">
        <header className="header">
          <h1>ToDo</h1>
          <h2>Task list: {pagesCount}</h2>
          <h3>number of pages: {Math.ceil(pagesCount / 5)}</h3>

          <ToDoForm
            addTask={addTask}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </header>
        <Sort
          setCurrentPage={setCurrentPage}
          setFilters={setFilters}
          todoFilter={todoFilter}
          setTodoFilter={setTodoFilter}
        />
        <RenderTodos
          todos={todos}
          setTodos={setTodos}
          meaning={meaning}
          setMeaning={setMeaning}
          deleteAxios={deleteAxios}
          patchAxios={patchAxios}
          setEdit={setEdit}
          setStatusFilter
          edit={edit}
          axiosPatchDone={axiosPatchDone}
          getAxios={getAxios}
        />
        <Pagination
          todosPerPage={todosPerPages}
          pagesCount={pagesCount}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
