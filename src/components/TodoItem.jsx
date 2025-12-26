import useTodoStore from "../store/useTodoStore";

function TodoItem({ todo }) {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const loading = useTodoStore((state) => state.loading);

  const handleToggle = () => {
    updateTodo(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={loading}
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.todo}
        </span>
      </div>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
