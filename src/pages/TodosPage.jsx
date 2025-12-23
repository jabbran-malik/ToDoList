import React, { useEffect } from 'react'
import { fetchTodos } from '../api/todos.api'
function TodosPage() {
useEffect(()=>{
    fetchTodos().then(res =>{
        console.log(res.data)
    })
})
  return (
    <div>TodosPage</div>
  )
}

export default TodosPage