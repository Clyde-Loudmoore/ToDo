import React from "react";
import Down from "../../img/down.png";
import Up from "../../img/up.png";
import './Sort.css'

function Sort({ setFilters }) {
  const todoFilter = (status) => setFilters((prev) => ({ ...prev, status }));
  return (
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
            onClick={() => setFilters((prev) => ({ ...prev, sort: "dateAsc" }))}
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
  );
}

export default Sort;
