import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import Down from "./img/down.png";
import Up from "./img/up.png";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        task: userInput,
        status: false,
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

  const [filtered, setFiltered] = useState(todos);
  const todoFilter = (status) => {
    if (status === "all") {
      setFiltered(todos);
    } else {
      let newTodos = todos.filter((todo) => todo.status === status);
      setFiltered(newTodos);
    }
  };
  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

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
              onClick={() => todoFilter(true)}
            >
              Done
            </button>
            <button
              type="button"
              className="sort_btn"
              onClick={() => todoFilter(false)}
            >
              Undone
            </button>
          </div>
          <div className="sort_date">
            <p>Sort by Date</p>
            <button className="sort_date__btn" type="button">
              <img src={Up} alt="Up" />
            </button>
            <button className="sort_date__btn" type="button">
              <img src={Down} alt="Down" />
            </button>
          </div>
        </div>

        {filtered.map((todo) => {
          return (
            <ToDo
              todo={todo}
              key={todo.id}
              toggleTask={hangleToggle}
              removeTask={removeTask}
            />
          );
        })}

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

export default App;
