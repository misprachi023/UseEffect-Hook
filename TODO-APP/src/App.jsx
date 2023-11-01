import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [todoInput, setTodoInput] = useState('')

  const addTodo = () =>{
    const id = Math.floor(Math.random() + Date.now());
    fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        title:todoInput
      })
  })
     .then(response => response.json())
     .then(response => setFetchDataFlag(flag=>!flag))
  }

  const [todosList, setTodosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum]=useState(1);
  const [fetchDataFlag, setFetchDataFlag]=useState(false);

  useEffect(()=>{
    fetch(`http://localhost:3000/api/todos?_limit=10&_page=${pageNum}`).then(resp=>resp.json())
    .then(resp=>{
      setTodosList(resp);
      setLoading(false);
    })
  }, [pageNum, fetchDataFlag]);

  const deleteTodoItem = (id)=>{
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response)
       setFetchDataFlag(flag=>!flag);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
  }

  const updateTodoItem = (id) =>{
    
  }

  return (
    <div>
      <div className='input'>
        <input type='text' value={todoInput} onChange={(e)=>setTodoInput(e.target.value)} placeholder='Add todo' />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className='show-data'>
        <h1>Exisiting todos list</h1>
        {loading?'Loading...':''}
          {todosList.map((todo, index)=>
           <div key={index} className='todo-item'>
            <div>
              <span>{((pageNum-1)*10)+(index+1)}</span>
              <span>{todo.title}</span>  
            </div>
            <div>
              <button onClick={()=>deleteTodoItem(todo.id)}>Delete</button>
              <button onClick={()=>updateTodoItem(todo.id)}>Update</button>
            </div>
           </div>
          )}
      </div>
      <div className='pageBtn'>
        <button disabled={pageNum==1} onClick={()=>setPageNum(pageNum=>pageNum-1)}>&lt; prev</button>
        <button disabled={todosList.length<10} onClick={()=>setPageNum(pageNum=>pageNum+1)}>next &gt; </button>
      </div>
    </div>
  )
}

export default App