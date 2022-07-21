import axios from "axios";

import React, { useEffect, useState } from "react";
import ToDoForm from "./Components/ToDoForm/ToDoForm";
import "./App.css";
import Pagination from "./Components/Pagination/Pagination";
import Sort from "./Components/Sort/Sort";
import RenderTodos from "./Components/RenderTodos/RenderTodos";

const todosPerPages = 5;

// axios
//   .get(
//     "https://todo-api-learning.herokuapp.com/v1/tasks/1?order=asc&pp=5&page=1"
//   )
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(todos.length);
  const [filters, setFilters] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const [userInput, setUserInput] = useState("");
  const [value, setValue] = useState("");

  const [statusFilter, setStatusFilter] = useState(0);

  const [sortedTasks, setSortedTasks] = useState([]);

  const saveTodo = (id) => {
    const title = value;
    if (title) {
      setTodos(
        todos.map((item) =>
          item.id === id ? { ...item, task: title, edit: false } : item
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
        id: Math.random().toString(36),
        task: userInput,
        status: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newItem]);
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const hangleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      )
    );
  };

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
