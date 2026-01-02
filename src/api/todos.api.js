
import { axiosClient } from "./axiosClient";

export const fetchTodos =() =>{
    return axiosClient.get('/todos')
}

export const  addTodo=(payLoad) => {
    return axiosClient.post('/todo/add',payLoad)
}


export const updateTodo =(id,payLoad) =>{
    return axiosClient.put(`/todos/${id}`,payLoad)
}

export const deleteTodo=(id) =>{
    return axiosClient.delete(`/todos/${id}`)
}