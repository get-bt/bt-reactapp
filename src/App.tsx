import { useEffect, useState } from 'react';
import './App.css';
import QuickFilteringGrid from './components/datagrid';
import { TodoList } from './Interfaces/todo.interface';
import { UserList } from './Interfaces/user.interface';
import { TodoService, UserService } from './Services/axios.service';


export default function App() {

  //This is the data I wish to move to the controller, as I feel I can add methods to the controller to search, add, edit, etc.
  const[todos, setTodos] = useState<TodoList>([]);
  const[users, setUsers] = useState<UserList>([]);

  const getData = async () => {
    const todos = await TodoService.getTodos();
    const users = await UserService.getUsers();
    setTodos(todos);
    setUsers(users);
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="App">
      <header className='App-header'>
      </header>
        <div>
          <QuickFilteringGrid todos={todos} users={users}/>
        </div>
    </div>
  );
}