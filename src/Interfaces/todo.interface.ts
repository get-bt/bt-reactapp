import { UserType } from "./user.interface";

export type TodoType = {
    id?: number,
    name: string;
    user?: UserType;
    isComplete: boolean;
}

export type TodoList = Array<TodoType>;