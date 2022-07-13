import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import Down from "./img/down.png";
import Up from "./img/up.png";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    sort: "dateAsc",
  });

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
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

  const todoFilter = (status) => setFilters((prev) => ({ ...prev, status }));

  function renderTodos() {
    return todos
      .filter((todo) => {
        if (filters.status === "all") return true;
        else if (filters.status === "done" && todo.status) {
          return true;
        } else if (filters.status === "undone" && !todo.status) {
          return true;
        }
      })
      .sort((a, b) => {
        if (filters.sort === "dateAsc") return a.createdAt - b.createdAt;
        return b.createdAt - a.createdAt;
      })
      .map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
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

          <ToDoForm addTask={addTask} />
        </header>

        <div className="sort">
          <div className="sort_btns">
            <button
              type="button"
              className="sort_btn"
              onClick={() => todoFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className="sort_btn"
              onClick={() => todoFilter("done")}
            >
              Done
            </button>
            <button
              type="button"
              className="sort_btn"
              onClick={() => todoFilter("undone")}
            >
              Undone
            </button>
          </div>
          <div className="sort_date">
            <p>Sort by Date</p>
            <button className="sort_date__btn" type="button">
              <img
                src={Up}
                alt="Up"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, sort: "dateAsc" }))
                }
              />
            </button>
            <button className="sort_date__btn" type="button">
              <img
                src={Down}
                alt="Down"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, sort: "dateDesc" }))
                }
              />
            </button>
          </div>
        </div>

        {renderTodos()}

        <div className="pagenation">
          <button type="button"></button>
          <button type="button">1</button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button">5</button>
          <button type="button"></button>
        </div>
      </div>
    </div>
  );
}
