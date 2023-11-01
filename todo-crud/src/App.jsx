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
     .then(response => fetchData())
  }

  const [todosList, setTodosList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum]=useState(1)

  useEffect(()=>{
    fetch(`http://localhost:3000/api/todos?_limit=10&_page=${pageNum}`).then(resp=>resp.json())
    .then(resp=>{
      setTodosList(resp);
      setLoading(false);
    })
  }, [pageNum])
  return (
    <div>
      <div className='input'>
        <input type='text' value={todoInput} onChange={(e)=>setTodoInput(e.target.value)} placeholder='Add todo' />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className='show-data'>
        <h1>Exisiting todos list</h1>
        {loading?'Loading...':''}
        <ol>
          {todosList.map((todo, index)=>
           <div className='todo-item'>
             <span>{((pageNum-1)*10)+(index+1)}</span>
            <span>{todo.title}</span>
           </div>
          )}
        </ol>
      </div>
      <div className='pageBtn'>
        <button disabled={pageNum==1} onClick={()=>setPageNum(pageNum=>pageNum-1)}>&lt; prev</button>
        <button disabled={todosList.length<10} onClick={()=>setPageNum(pageNum=>pageNum+1)}>next &gt; </button>
      </div>
    </div>
  )
}

export default App