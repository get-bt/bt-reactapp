import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  getTodos(setTodoData);

  return (
    <div className="App">
      <body>
        {todoData && 
          <ul>
            {todoData.map(({id, name, isComplete}) => (
              <li key={id}>{name}: {isComplete ? 'Complete!' : 'Not Complete'}</li>
            ))}
          </ul>
        }

      </body>
    </div>
  );
}

async function getTodos(setData:Function) {
  try {
    const response = await axios.get('api/todos')
    setData(response.data.todos)
  } catch (error) {
    console.log(error)
  }
}