import React, { useEffect, useState } from "react";
import "./App.css";

import {
  axiosGet,
  axiosPost,
  axiosPatch,
  axiosDelete,
} from "./Components/API/API";

import { NUMBER_OF_PAGES, SORT_BY_DATE } from "./Constants";

import swal from "sweetalert";

import ToDoForm from "./Components/ToDoForm/ToDoForm";
import Pagination from "./Components/Pagination/Pagination";
import Sort from "./Components/Sort/Sort";
import RenderTodos from "./Components/RenderTodos/RenderTodos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [pagesCount, setPagesCount] = useState(NUMBER_OF_PAGES);
  const [sortByDate, setSortByDate] = useState(SORT_BY_DATE.ASC);

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

  const updateTask = async (uuid, _, name) => {
    console.log(uuid, name);
    try {
      await axiosPatch(uuid, _, name);
      setInputValue("");
      getTasksList();
      // swal("OK!")
    } catch (err) {
      swal("ERROR 400:", "Task not created, write something..");
    }
  };

  const updateTaskDone = async (uuid, done, _) => {
    console.log(uuid, done);
    try {
      await axiosPatch(uuid, done, _);
      setInputValue("");
      getTasksList();
      // swal("OK!")
    } catch (err) {
      swal("ERROR 400:", "The event did not happen");
    }
  };

  const deleteTaskByUuid = async (uuid) => {
    try {
      await axiosDelete(uuid);
      getTasksList();
    } catch (err) {
      swal("ERROR 404:", "Task not found");
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
          deleteTaskByUuid={deleteTaskByUuid}
          updateTask={updateTask}
          setStatusFilter
          setEditTask={setEditTask}
          editTask={editTask}
          getTasksList={getTasksList}
          updateTaskDone={updateTaskDone}
        />
        <Pagination pagesCount={pagesCount} paginate={paginate} />
      </div>
    </div>
  );
}
