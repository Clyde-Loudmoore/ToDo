import React, { useState } from "react";

export default function ToDoForm({ addTask }) {
  const [userInput, setUserInput] = useState("");

  const hangleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
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
        value={userInput}
        type="text"
        onChange={hangleChange}
        onKeyDown={handleKeyPress}
        placeholder="I want to..."
      />
      <button className="add">Add</button>
    </form>
  );
}
