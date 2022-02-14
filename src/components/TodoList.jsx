import React from "react";
import { FaRegTimesCircle, FaRegCircle, FaCheckCircle } from "react-icons/fa";

const TodoList = (props) => {
  const { todos, onDelete, onCheck } = props;
  return (
    <ul className="list-group mb-3">
      {todos.map((todo) => (
        <li
          className={
            todo.checked
              ? "list-group-item d-flex justify-content-between list-group-item-success"
              : "list-group-item d-flex justify-content-between"
          }
          key={todo.id}
        >
          <div onClick={() => onCheck(todo)}>
            {todo.checked ? (
              <FaCheckCircle className="todo-checked" size="20px" />
            ) : (
              <FaRegCircle className="todo-unchecked" size="20px" />
            )}
            {todo.checked ? <del>{todo.value}</del> : todo.value}
          </div>

          <div>
            {!todo.checked && (
              <span>
                <FaRegTimesCircle
                  size="22px"
                  className="delete-btn"
                  onClick={() => onDelete(todo)}
                />
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
