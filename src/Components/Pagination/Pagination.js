import React from "react";
import "./Pagination.css";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const Pagination = ({ paginate, pagesCount }) => {
  const x = pagesCount / 5;
  const y = Math.ceil(x);

  return (
    <div>
      <ul className="pagination">
        <DoubleLeftOutlined onClick={() => paginate(1)} />
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
        <DoubleRightOutlined
          onClick={() => paginate(Math.ceil(pagesCount / 5))}
        />
      </ul>
    </div>
  );
};

export default Pagination;
