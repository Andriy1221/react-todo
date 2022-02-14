import "./App.css";
import AddTodo from "./components/AddTodo";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  FaRegTimesCircle,
  FaRegCircle,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function App() {
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(true);

  const openTodos = todos.filter((todo) => !todo.checked).length;

  const handleSubmitTodo = (newTodoInput) => {
    const newTodo = {
      id: uuid(),
      value: newTodoInput,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleCheck = (todo) => {
    const updatedTodo = todo;
    updatedTodo.checked = !updatedTodo.checked;

    const index = todos.findIndex((item) => item.id === todo.id);
    const updatedTodos = todos;
    updatedTodos[index] = updatedTodo;
    setTodos([...updatedTodos]);
  };

  const handleDelete = (todo) => {
    const updatedTodos = todos.filter((item) => item.id != todo.id);
    setTodos(updatedTodos);
  };

  const handleClearTodos = () => {
    const newCheckedTodos = todos.filter((todo) => todo.checked === true);
    const updatedCheckedTodos = [...newCheckedTodos, ...checkedTodos];
    setCheckedTodos(updatedCheckedTodos);
    const clearedTodos = todos.filter((todo) => !todo.checked);
    setTodos(clearedTodos);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="pt-5 text-center">Let's get things done! 👨‍💻</h1>
        <AddTodo onSubmitTodo={handleSubmitTodo} />
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
              <div onClick={() => handleCheck(todo)}>
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
                      onClick={() => handleDelete(todo)}
                    />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="d-flex flex-row-reverse mb-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClearTodos}
          >
            <FaTrash></FaTrash> Clear
          </button>
        </div>
        {openTodos > 0 ? (
          <p className="text-center mt-5">{openTodos} tasks waiting for you</p>
        ) : (
          <p className="text-center">🎉 You're finished! Time for a break!</p>
        )}
        <div className="text-center">
          <hr class="mt-2 mb-5 mt-5" />

          <span
            className="toogle-text"
            onClick={() => setHideCompleted(!hideCompleted)}
          >
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
      </div>
    </div>
  );
}

export default App;
