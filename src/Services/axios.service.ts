import axios, {AxiosResponse} from "axios";
import { TodoList, TodoType } from "../interfaces/todo.interface";
import { UserList, UserType } from "../interfaces/user.interface";


//This isn't written as a singular 'Service,' though I realize it would probably
// need to be if I intend on getting it to work with the controller.

const instance = axios.create({
    baseURL: ' http://localhost:3000/api/',
    timeout: 15000
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	patch: (url: string, body: {}) => instance.patch(url, body).then(responseBody),
	delete: (url: string) => instance.delete(url).then(responseBody),
};

export const UserService = {
    getUsers: (): Promise<UserList> => requests.get('users').then((response) => response.users),
    getAUser: (id: number): Promise<UserType> => requests.get('user/'+id),
    createUser: (user: UserType): Promise<UserType> => requests.post('users/create', user),
    updateUser: (id: number, user: UserType): Promise<UserType> => requests.patch('user/'+id, user),
    deleteUser: (id: number): Promise<void> => requests.get('user/'+id+'/delete')
}

export const TodoService = {
    getTodos: (): Promise<TodoList> => requests.get('todos').then((response) => response.todos),
    getATodo: (id: number): Promise<TodoType> => requests.get('todo/'+id).then((response) => response.todo),
    createTodo: (todo: TodoType): Promise<TodoType> => requests.post('todo/create', todo),
    updateTodo: (id: number, todo: TodoType): Promise<TodoType> => requests.patch('todo/'+id+'/edit', todo),
    deleteTodo: (id: number): Promise<void> => requests.get('todo/'+id+'/delete') //this was requests.delete, however it seems MirageJS prefers .get for all interactions
}
