import React, { useState } from "react";

function AddTodo(props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmitTodo(input);
    setInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mt-5 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={input || ""}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
