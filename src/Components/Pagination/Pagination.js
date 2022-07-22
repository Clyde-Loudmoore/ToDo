import React from "react";
import "./Pagination.css";

const Pagination = ({ paginate, totalTodos }) => {
  return (
    <div>
      <ul className="pagination">
        <button className="page-item_btn" onClick={() => paginate(1)}>
          &lt;&lt;
        </button>
        {Array.from(Array(totalTodos).keys()).map((_, index) => (
          <li className="page-item" key={index + 1}>
            <button
              className="page-item_btn"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <button className="page-item_btn" onClick={() => paginate(totalTodos)}>
          &gt;&gt;
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
