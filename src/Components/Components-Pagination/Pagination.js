import React from "react";
import "./Pagination.css";

const Pagination = ({ paginate, pageNumber }) => {
  const firstPage = pageNumber[0];
  const lastPage = pageNumber.slice(-1);

  return (
    <div>
      <ul className="pagination">
        <button className="page-item_btn" onClick={() => paginate(firstPage)}>
          &lt;&lt;
        </button>
        {pageNumber.map((number) => (
          <li className="page-item" key={number}>
            <button className="page-item_btn" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        <button className="page-item_btn" onClick={() => paginate(lastPage)}>
          &gt;&gt;
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
