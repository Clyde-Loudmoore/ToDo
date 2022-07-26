import axios from "axios";

import React, { useEffect, useState } from "react";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import "./App.css";
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
  const [value, setValue] = useState("");
  const [todoFilter, setTodoFilter] = useState("");

  const axiosGet = () => {
    axios
      .get("https://todo-api-learning.herokuapp.com/v1/tasks/1", {
        params: {
          filterBy: todoFilter,
          order: filters === 0 ? "asc" : "desc",
          pp: 5,
          page: currentPage,
        },
      })
      .then((response) => {
        // console.log(response);
        setTodos(response.data.tasks);
        setPagesCount(response.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const axiosPost = (task) => {
    axios
      .post("https://todo-api-learning.herokuapp.com/v1/task/1", task)
      .catch((error) => {
        console.error(error);
      });
  };

  const axiosPatch = (uuid, userInput) => {
    axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/1/${uuid}`, {
        name: userInput,
      })
      .then((response) => {
        setEdit(value);
        saveTodo(uuid);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const axiosDelete = (uuid) => {
    axios
      .delete(`https://todo-api-learning.herokuapp.com/v1/task/1/${uuid}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const saveTodo = (uuid) => {
    const title = value;
    if (title) {
      setTodos(
        todos.map((todo) =>
          todo.uuid === uuid ? { ...todo, task: title, edit: false } : todo
        )
      );
      setValue("");
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

      axiosPost(newItem);
    }
  };

  const hangleToggle = (done, uuid) => {
    console.log(done, uuid);
    axios
      .patch(`https://todo-api-learning.herokuapp.com/v1/task/1/${uuid}`, {
        done: !done,
      })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.uuid === uuid ? { ...todo, done: !todo.done } : todo
          )
        );
      });
  };

  useEffect(() => {
    axiosGet();
  }, [todoFilter, currentPage, filters,]);

  return (
    <div className="App">
      <div className="base">
        <header className="header">
          <h1>ToDo</h1>
          <h2>Task list: {todos.length}</h2>
          <h3>number of pages: {pagesCount}</h3>

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
          hangleToggle={hangleToggle}
          value={value}
          setValue={setValue}
          axiosDelete={axiosDelete}
          axiosPatch={axiosPatch}
          setEdit={setEdit}
          setStatusFilter
          edit={edit}
        />
        <Pagination
          todosPerPage={todosPerPages}
          totalTodos={pagesCount}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
