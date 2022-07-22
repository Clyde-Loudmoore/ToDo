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
  const [pagesCount, setPagesCount] = useState(todos.length);
  const [filters, setFilters] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [edit, setEdit] = useState();
  const [userInput, setUserInput] = useState("");
  const [value, setValue] = useState("");

  const [statusFilter, setStatusFilter] = useState(0);

  const [sortedTasks, setSortedTasks] = useState([]);

  const axiosGet = () => {
    axios
      .get(
        `https://todo-api-learning.herokuapp.com/v1/tasks/1?order=&pp=5&page=${currentPage}`
      )
      .then((response) => {
        // console.log(response.data.tasks);
        setTodos(response.data.tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const axiosPost = (task) => {
    axios
      .post("https://todo-api-learning.herokuapp.com/v1/task/1", task)
      .then((response) => {
        console.log(response);
      })
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
        todos.map((item) =>
          item.uuid === uuid ? { ...item, task: title, edit: false } : item
        )
      );
      setValue("");
    }
  };

  const todoFilter = (status) => setStatusFilter(status);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(pagesCount / todosPerPages); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        name: userInput,
      };

      axiosPost(newItem);
      axiosGet();
    }
  };

  const removeTask = (uuid) => {
    setTodos(todos.filter((todo) => todo.uuid !== uuid));
  };

  const hangleToggle = (uuid) => {
    setTodos(
      todos.map((todo) =>
        todo.uuid === uuid ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  useEffect(() => {
    axiosGet();
  }, [statusFilter, currentPage, sortedTasks]);

  useEffect(() => {
    const countOfTodos = todos.filter((todo) => {
      if (statusFilter === 0) return true;
      else if (statusFilter === 1 && todo.status) {
        return true;
      } else if (statusFilter === 2 && !todo.status) {
        return true;
      }
    });

    setSortedTasks(countOfTodos);
    setPagesCount(Math.ceil(countOfTodos.length / todosPerPages));
  }, [filters, todos, statusFilter]);

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
        />
        <RenderTodos
          todos={todos}
          filters={filters}
          currentPage={currentPage}
          todosPerPages={todosPerPages}
          setTodos={setTodos}
          hangleToggle={hangleToggle}
          removeTask={removeTask}
          value={value}
          setValue={setValue}
          saveTodo={saveTodo}
          statusFilter={statusFilter}
          sortedTasks={sortedTasks}
          axiosDelete={axiosDelete}
          axiosPatch={axiosPatch}
          setEdit={setEdit}
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
