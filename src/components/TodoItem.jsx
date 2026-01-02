import { useState } from "react";
import useTodoStore from "../store/useTodoStore";

function TodoItem({ todo }) {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const loading = useTodoStore((state) => state.loading);
  const editTodo = useTodoStore((state) => state.editTodo);


  const [isEditing ,setIsEditing] =useState(false);
  const [title ,setTitle] =useState(todo.todo);
  const handleToggle = () => {
    updateTodo(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };
   const handleEditSave = () => {
    editTodo(todo.id, title);
    setIsEditing(false);
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
        { isEditing ? (
                <input value={title}
                onChange={(e)=> setTitle(e.target.value)}
                className="border px-2 py-1 rounded w-full" />
            ):(
        
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {todo.todo}
        </span>
            )}
      </div>
      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <button
            onClick={handleEditSave}
            disabled={loading}
            className="text-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className="text-blue-500"
          >
            Edit
          </button>
        )}
            <button
        onClick={handleDelete}
        disabled={loading}
        className="text-red-500 hover:text-red-700 disabled:opacity-50"
      >
        Delete
      </button>
      </div>
    </li>
  );
}

export default TodoItem;
