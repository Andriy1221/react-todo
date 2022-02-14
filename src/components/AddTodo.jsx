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
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-3 mt-5"
            placeholder="New Todo"
            value={input || ""}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
