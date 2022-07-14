import React from "react";

const Pagination = ({ paginate, pageNumber }) => {
  return (
    <div>
      <ul className="pagination">
        <button className="page-item_btn"></button>
        {pageNumber.map((number) => (
          <li className="page-item" key={number}>
            <button className="page-item_btn" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        <button className="page-item_btn"></button>
      </ul>
    </div>
  );
};

export default Pagination;
