import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import ClickCounter from './ClickCounter.jsx';
function App() {

  return (
    <>
       
    <div className="App">
      <ClickCounter />
    </div>
  
    </>
  )
}
export default App;




ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App />
  
)
