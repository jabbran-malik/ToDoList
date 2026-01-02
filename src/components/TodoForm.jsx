import { useState } from "react";
import useTodoStore from "../store/useTodoStore";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);
  const loading = useTodoStore((state) => state.loading);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    addTodo(todo);
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-6"
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
