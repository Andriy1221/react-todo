import "./App.css";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import CompletedTodos from "./components/CompletedTodos";
import { v4 as uuid } from "uuid";
import { FaTrash } from "react-icons/fa";

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
    const updatedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(updatedTodos);
  };

  const handleClearTodos = () => {
    const newCheckedTodos = todos.filter((todo) => todo.checked === true);
    const updatedCheckedTodos = [...newCheckedTodos, ...checkedTodos];
    setCheckedTodos(updatedCheckedTodos);
    const clearedTodos = todos.filter((todo) => !todo.checked);
    setTodos(clearedTodos);
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
            <FaTrash></FaTrash> Clear
          </button>
        </div>
        {openTodos > 0 ? (
          <p className="text-center mt-5">{openTodos} tasks waiting for you</p>
        ) : (
          <p className="text-center">🎉 You're finished! Time for a break!</p>
        )}
        <hr class="mt-2 mb-5 mt-5" />
        <CompletedTodos
          checkedTodos={checkedTodos}
          onHideCompleted={handleHideCompleted}
          hideCompleted={hideCompleted}
        />
      </div>
    </div>
  );
}

export default App;
