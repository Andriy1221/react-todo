import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const CompletedTodos = (props) => {
  const { checkedTodos, onHideCompleted, hideCompleted } = props;
  return (
    <div className="text-center">
      <span className="toogle-text" onClick={onHideCompleted}>
        {hideCompleted ? (
          <span>
            Show completed tasks <IoIosArrowDown size="22px" />
          </span>
        ) : (
          <span>
            Hide completed tasks <IoIosArrowUp size="22px" />
          </span>
        )}
      </span>
      {!hideCompleted && (
        <ul className="list-group mb-5 mt-3">
          {checkedTodos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between list-group-item-success"
            >
              <div>
                <FaCheckCircle className="todo-checked" size="20px" />
                <del>{todo.value}</del>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTodos;
