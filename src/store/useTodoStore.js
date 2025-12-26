import { create } from "zustand";
import {
    fetchTodos as fetchTodosApi,
    addTodo as addTodoApi,
    updateTodo as updateTodoApi,
    deleteTodo as deleteTodoApi,
}
from '../api/todos.api'

const useTodoStore =create((set, get)=>({
    todos :[],
    loading: false,
    error: null,

    fetchTodos:async()=>{
        set({loading :true ,error:null})
        try{
            const res= await fetchTodosApi();
            set({todos: res.data.todos})
        }
        catch(err){
            set({error:err.message||"Failed to fetch todos"});

        }finally{
            set({loading:false});
        }
    },

    addTodo:async (todoText)=>{
        // set({loading:true error:null});
        set({ error:null});

        const tempTodo={
            id :Date.now() + Math.random(),
            todo: todoText,
            completed:false,
            userId: 1,
            optimistice :true,
        }
        set((state)=>({
            todos:[tempTodo,...state.todos],
        }))
        try{
            const payLoad={
                todo:todoText,
                completed:false,
                userId:1,
            }
            const res =await addTodoApi(payLoad);
            set((state)=>({
                // todos:[res.data, ...state.todos],
                todos:[state.todos.map((todo)=>
                todo.id===tempTodo.id? res.data: todo
                )],
            }))
        }

            catch(err){
                // set({error :err.message||"failed to add todo"})
                set((state)=>({
                    todos: state.todos.filter((todo)=>todo.id !== tempTodo.id),
                    error:'TODO can not b added',err
                }))
            }
            finally{
                set({loading:false});
            }
        
    },
    updateTodo: async(id,completed)=>{
        // set({loading:true , error:null});
        set({error:null});
        set((state)=> ({todos: state.todos.map((todo)=> todo.id===id ? {...todo, completed}:todo),}))
       try {
    await updateTodoApi(id, { completed });
  } 
  catch (err) {
    
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !completed }
          : todo
      ),
      error: "Todo  can not b updated",err
    }));
  }
},
     
 deleteTodo: async (id) => {
    // set({ loading: true, error: null });
    set({ error: null });

    const previousTodos=get().todos;
    set ((state)=> ({ todos:state.todos.filter((todo)=> todo.id !==id)}))
    try {
        await deleteTodoApi(id);
    } catch (err) {
    //    console.error("Delete failed:", err);
       set({todos:previousTodos,
         error: "Todo can't be  delete (API issue)" ,err});
    } finally {
        set({ loading: false });
    }
},

    
}));
export default useTodoStore;