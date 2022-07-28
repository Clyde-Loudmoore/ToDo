import React from "react";
import "./Sort.css";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

function Sort({ setSortByDate, setCurrentPage, setFilterTaskStatus }) {
  return (
    <div className="sort">
      <div className="sort_btns">
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setFilterTaskStatus("");
          }}
        >
          All
        </button>
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setFilterTaskStatus("done");
          }}
        >
          Done
        </button>
        <button
          type="button"
          className="sort_btn"
          onClick={() => {
            setCurrentPage(1);
            setFilterTaskStatus("undone");
          }}
        >
          Undone
        </button>
      </div>
      <div className="sort_date">
        <p>Sort by Date</p>
        <ArrowUpOutlined onClick={() => setSortByDate(0)} />
        <ArrowDownOutlined onClick={() => setSortByDate(1)} />
      </div>
    </div>
  );
}

export default Sort;
