import React from "react";
import { useEffect, useState } from "react";
import { TodoList, TodoType } from "../Interfaces/todo.interface";
import { UserList } from "../Interfaces/user.interface";



class Controller extends React.Component<{}, {service: any, todos:TodoList, users:UserList}> {
    constructor(props:any) {
        super(props);
        this.state = {
            service: props.service,
            todos: <TodoList>[],
            users: <UserList>[]
        }
    }

    public getData = async () => {
        let t = await this.state.service.getTodos;
        let u = await this.state.service.getUsers;
        this.setState({
            todos: t,
            users: u
        })
      }
}

export default Controller;