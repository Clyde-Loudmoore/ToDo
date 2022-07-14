import React from "react";

const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li className="page-item" key={number}>
            <button>
              <a href="!#" onClick={() => paginate(number)}>
                {number}
              </a>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
