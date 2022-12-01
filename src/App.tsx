import React from 'react';
import './App.css';
import AddTodoToolbar from './components/addtodotoolbar';
import TodoDisplayer from './features/todos/todoDisplay';

function App() {
  return (
    <div className="App">
      <header>
        <h2>Task List</h2>
      </header>
      <TodoDisplayer/>
      <AddTodoToolbar/>
    </div>
  );
}

export default App;
