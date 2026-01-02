
import { create } from "zustand";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../api/todos.api";

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true });
    try {
      const res = await fetchTodos();
      set({ todos: res.data.todos, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTodo: async (title) => {
    set({ loading: true });
    try {
      const res = await addTodo({ todo: title, completed: false, userId: 1 });
      set((state) => ({
        todos: [res.data, ...state.todos],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

 
  updateTodo: async (id, completed) => {
    set({ loading: true });
    try {
      await updateTodo(id, { completed });
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, completed } : t
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  
  editTodo: async (id, newTitle) => {
    set({ loading: true });
    try {
      await updateTodo(id, { todo: newTitle });
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, todo: newTitle } : t
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true });
    try {
      await deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useTodoStore;
