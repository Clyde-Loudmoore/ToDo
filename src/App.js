import React, { useEffect, useState } from "react";
import ToDoForm from "./Components/Components-ToDoForm/ToDoForm";
import ToDo from "./Components/Components-ToDo/ToDo";
import "./App.css";
import Pagination from "./Components/Components-Pagination/Pagination";
import Sort from "./Components/Components-Sort/Sort";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(todos.length);
  const [filters, setFilters] = useState({
    status: "all",
    sort: "dateAsc",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPages = 5;

  const todoFilter = (status) => setFilters((prev) => ({ ...prev, status }));

  // const firstTodoIndex = currentPage * todosPerPages;
  // const lastTodoIndex = firstTodoIndex + todosPerPages;
  // const currentTodo = todos.slice(firstTodoIndex, lastTodoIndex);

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
        todo.id === id ? { ...todo, status: !todo.status } : { ...todo }
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

  function renderTodos() {
    const filteredTodos = todos.filter((todo) => {
      if (filters.status === "all") return true;
      else if (filters.status === "done" && todo.status) {
        return true;
      } else if (filters.status === "undone" && !todo.status) {
        return true;
      }
    });

    return filteredTodos
      .slice(
        (currentPage - 1) * todosPerPages,
        (currentPage - 1) * todosPerPages + todosPerPages
      )
      .sort((a, b) => {
        if (filters.sort === "dateAsc") return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      })
      .map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            todos={todos}
            setTodos={setTodos}
            toggleTask={hangleToggle}
            removeTask={removeTask}
          />
        );
      });
  }

  return (
    <div className="App">
      <div className="base">
        <header className="header">
          <h1>ToDo</h1>
          <h2>Task list: {todos.length}</h2>
          <h3>number of pages: {pagesCount}</h3>

          <ToDoForm addTask={addTask} />
        </header>
        <Sort
          setCurrentPage={setCurrentPage}
          setFilters={setFilters}
          todoFilter={todoFilter}
        />
        {renderTodos()}
        <Pagination
          todosPerPage={todosPerPages}
          totalTodos={pagesCount}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
