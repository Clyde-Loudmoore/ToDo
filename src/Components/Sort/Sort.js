import React from "react";
import "./Sort.css";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

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
        <ArrowUpOutlined onClick={() => setFilters(0)} />
        <ArrowDownOutlined onClick={() => setFilters(1)} />
      </div>
    </div>
  );
}

export default Sort;
