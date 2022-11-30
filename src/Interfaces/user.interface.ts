import { TodoType } from "./todo.interface";

export type UserType = {
    id?: number,
    firstName: string;
    lastName: string;
    todos?: TodoType[],
}

export type UserList = Array<UserType>;