import React from "react";
import Down from "../../img/down.png";
import Up from "../../img/up.png";
import "./Sort.css";

function Sort({ todoFilter, setFilters, setCurrentPage, setTodoFilter }) {
  return (
    <div className="sort">
      <div className="sort_btns">
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setTodoFilter("");
          }}
        >
          All
        </button>
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setTodoFilter("done");
          }}
        >
          Done
        </button>
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setTodoFilter("undone");
          }}
        >
          Undone
        </button>
      </div>
      <div className="sort_date">
        <p>Sort by Date</p>
        <button className="sort_date__btn" type="button">
          <img src={Up} alt="Up" onClick={() => setFilters(0)} />
        </button>
        <button className="sort_date__btn" type="button">
          <img src={Down} alt="Down" onClick={() => setFilters(1)} />
        </button>
      </div>
    </div>
  );
}

export default Sort;
