import { useEffect } from "react";
import useTodoStore from "../store/useTodoStore";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function TodosPage() {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const loading = useTodoStore((state) => state.loading);
  const error = useTodoStore((state) => state.error);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Todo App
        </h1>

        <TodoForm />

        {loading && (
          <p className="text-center text-blue-500 mb-2">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500 mb-2">
            {error}
          </p>
        )}

        <TodoList />
      </div>
    </div>
  );
}

export default TodosPage;
