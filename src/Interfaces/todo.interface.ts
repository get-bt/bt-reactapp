export type TodoType = {
    id?: number,
    name: string;
    user: number;
    isComplete: boolean;
}

export type TodoList = Array<TodoType>;