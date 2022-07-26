import React from "react";
import "./Pagination.css";

const Pagination = ({ paginate, pagesCount }) => {
  const x = pagesCount / 5;
  const y = Math.ceil(x);

  return (
    <div>
      <ul className="pagination">
        <button className="page-item_btn" onClick={() => paginate(1)}>
          &lt;&lt;
        </button>
        {Array.from(Array(y).keys()).map((_, index) => (
          <li className="page-item" key={index + 1}>
            <button
              className="page-item_btn"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <button
          className="page-item_btn"
          onClick={() => paginate(Math.ceil(pagesCount/5))}
        >
          &gt;&gt;
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
