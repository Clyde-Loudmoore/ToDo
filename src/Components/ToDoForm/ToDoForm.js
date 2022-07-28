import React from "react";
import "./ToDoForm.css";

export default function ToDoForm({
  addTask,
  userInputField,
  setUserInputField,
}) {
  const hangleChange = (e) => {
    setUserInputField(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInputField);
    setUserInputField("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="message"
        value={userInputField}
        type="text"
        onChange={hangleChange}
        onKeyDown={handleKeyPress}
        placeholder="I want to..."
      />
      <button className="add">Add</button>
    </form>
  );
}
