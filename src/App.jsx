import "./App.css";
import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import CompletedTodos from "./components/CompletedTodos";
import { v4 as uuid } from "uuid";
import { FaTrash, FaSave, FaCheck } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(true);

  const openTodos = todos.filter((todo) => !todo.checked).length;

  const notify = () => {
    toast.success("Your tasks were saved. See you later!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("todos")) {
      setTodos(JSON.parse(window.localStorage.getItem("todos")));
      setCheckedTodos(JSON.parse(window.localStorage.getItem("checkedTodos")));
    }
  }, []);

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
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
    setCheckedTodos([]);
  };

  const handleClearTodos = () => {
    const newCheckedTodos = todos.filter((todo) => todo.checked === true);
    const updatedCheckedTodos = [...newCheckedTodos, ...checkedTodos];
    setCheckedTodos(updatedCheckedTodos);
    const clearedTodos = todos.filter((todo) => !todo.checked);
    setTodos(clearedTodos);
  };
  const handleSaveTodos = () => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
    window.localStorage.setItem("checkedTodos", JSON.stringify(checkedTodos));
    notify();
  };

  const handleHideCompleted = () => {
    setHideCompleted(!hideCompleted);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="pt-5 text-center">Let's get things done! 👨‍💻</h1>
        <AddTodo onSubmitTodo={handleSubmitTodo} />
        <TodoList todos={todos} onDelete={handleDelete} onCheck={handleCheck} />
        <div className="d-flex flex-row-reverse mb-2">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClearTodos}
          >
            <FaCheck /> Clear
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSaveTodos}
            style={{ margin: "0 15px" }}
          >
            <FaSave /> Save
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleDeleteAll}
          >
            <FaTrash /> Delete All
          </button>
        </div>
        {openTodos > 0 ? (
          <p className="text-center mt-5">
            <span className="badge bg-secondary">{openTodos} </span> tasks are
            waiting for you
          </p>
        ) : (
          <p className="text-center mt-5">
            🎉 You're finished! Time for a break!
          </p>
        )}
        <hr className="mt-2 mb-5 mt-5" />
        <CompletedTodos
          checkedTodos={checkedTodos}
          onHideCompleted={handleHideCompleted}
          hideCompleted={hideCompleted}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
