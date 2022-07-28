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

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [sortByDate, setSortByDate] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [editTask, setEditTask] = useState();
  const [userInputField, setUserInputField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterTaskStatus, setFilterTaskStatus] = useState("");

  const getTasksList = async () => {
    try {
      const response = await axiosGet(
        filterTaskStatus,
        sortByDate,
        currentPage
      );

      setTodos(response.data.tasks);
      setPagesCount(response.data.count);
    } catch (err) {
      swal(err.message);
    }
  };

  const createTask = async (task) => {
    try {
      await axiosPost(task);
    } catch (err) {
      swal("ERROR 400:", "Task not created");
    }
    getTasksList();
  };

  const updateTask = (done, uuid) => {
    axiosPatch(done, uuid)
      .then(() => {
        saveTodo(uuid);
        getTasksList();
      })
      .catch((error) => {
        console.error(error);
        swal("ERROR 400:", "Task not created, write something..");
      });
  };

  const deleteTaskById = (uuid) => {
    axiosDelete(uuid)
      .then((response) => {
        console.log(response);
        getTasksList();
      })
      .catch((error) => {
        swal("ERROR 404:", "Task not found");
      });
  };

  const saveTodo = (uuid) => {
    const title = inputValue;
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

  const addTask = (userInputField) => {
    if (userInputField) {
      const newItem = {
        name: userInputField,
      };
      createTask(newItem);
    }
  };

  useEffect(() => {
    getTasksList();
  }, [filterTaskStatus, currentPage, sortByDate]);

  return (
    <div className="App">
      <div className="base">
        <header className="header">
          <h1>ToDo</h1>
          <h2>Task list: {pagesCount}</h2>
          <h3>number of pages: {Math.ceil(pagesCount / 5)}</h3>

          <ToDoForm
            addTask={addTask}
            userInputField={userInputField}
            setUserInputField={setUserInputField}
          />
        </header>
        <Sort
          setCurrentPage={setCurrentPage}
          setSortByDate={setSortByDate}
          filterTaskStatus={filterTaskStatus}
          setFilterTaskStatus={setFilterTaskStatus}
        />
        <RenderTodos
          todos={todos}
          setTodos={setTodos}
          inputValue={inputValue}
          setInputValue={setInputValue}
          deleteTaskById={deleteTaskById}
          updateTask={updateTask}
          setStatusFilter
          setEditTask={setEditTask}
          editTask={editTask}
          axiosPatchDone={axiosPatchDone}
          getTasksList={getTasksList}
        />
        <Pagination pagesCount={pagesCount} paginate={paginate} />
      </div>
    </div>
  );
}
