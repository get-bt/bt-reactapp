import { UserType } from "./user.interface";

 export interface TodoType {
    id?: number,
    name: string;
    user?: UserType;
    isComplete: boolean;
}

export type TodoList = Array<TodoType>;