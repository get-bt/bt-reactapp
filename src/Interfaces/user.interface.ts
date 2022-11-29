import { TodoType } from "./todo.interface";

export interface UserType {
    id?: number,
    firstName: string;
    lastName: string;
    todos?: TodoType[],
}

export type UserList = Array<UserType>;