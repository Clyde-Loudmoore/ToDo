import React, { useEffect, useState } from "react";
import ToDoForm from "./Components/Components-ToDoForm/ToDoForm";

import "./App.css";
import Pagination from "./Components/Components-Pagination/Pagination";
import Sort from "./Components/Components-Sort/Sort";
import RenderTodos from "./Components/Components-RenderTodos/RenderTodos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(todos.length);
  const [filters, setFilters] = useState({
    status: "all",
    sort: "dateAsc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPages = 5;

  const [userInput, setUserInput] = useState("");
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(null);

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

  const todoFilter = (status) => setFilters((prev) => ({ ...prev, status })); //prev check

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
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const hangleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, status: !todo.status } : todo
      ),
    ]);
  };

  useEffect(() => {
    const countOfTodos = todos.filter((todo) => {
      if (filters.status === "all") return true;
      else if (filters.status === "done" && todo.status) {
        return true;
      } else if (filters.status === "undone" && !todo.status) {
        return true;
      }
    }).length;
    setPagesCount(Math.ceil(countOfTodos / todosPerPages));
  }, [filters, todos]);

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
          todos={todos}
        />
        <RenderTodos
          todos={todos}
          filters={filters}
          currentPage={currentPage}
          todosPerPages={todosPerPages}
          setTodos={setTodos}
          toggleTask={hangleToggle}
          removeTask={removeTask}
          value={value}
          setValue={setValue}
          edit={edit}
          setEdit={setEdit}
          saveTodo={saveTodo}
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
