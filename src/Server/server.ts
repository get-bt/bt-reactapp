import {
    Server,
    Model,
    belongsTo,
    hasMany,
    RestSerializer,
    Factory,
} from "miragejs";
import {faker} from '@faker-js/faker';

export function makeServer () {
    const server = new Server({
        serializers: {
            todo: RestSerializer.extend({
                serializeIds:"always",
                
            }),
            users: RestSerializer.extend({
                include:["todo"],
                embed: true
            }),            
        },
        models: {
            todo: Model.extend({
                user: belongsTo()
            }),
            user: Model.extend({
                todo: hasMany()
            })
        },
        factories: {
            user: Factory.extend({
                id(i:number) {
                    return Number(i+1)
                },
                firstName() {
                    return faker.name.firstName()
                },
                lastName() {
                    return faker.name.lastName()
                }
            }),
            todo: Factory.extend({
                name() {
                    return faker.random.words(4)
                },
                isComplete() {
                    return faker.datatype.boolean()
                }
            })
        },
        seeds(server) {
            const users = server.createList("user", 5);
            users.forEach(user => {
                server.createList("todo", faker.datatype.number({max: 4}), {user:user} as any)
            });
        },
        routes() {
            this.namespace = '/api'

            // User APIs

            // GET ALL
            this.get('/users', (schema: any) => {
                return schema.users.all()
            })

            this.get('user/:id', (schema: any, request) => {
                const userID = request.params.id
                const user = schema.users.find(userID)
                return {
                    user: user
                }
            })

            // GET :id
            this.get('/user/:id/todos', (schema: any, request) => {
                const userID = request.params.id
                const todos = schema.todos.where({userID: userID})
                return {
                    todos: todos
                }
            })

            // Todo APIs

            // GET ALL
            this.get('todos', (schema: any, request) => {
                return schema.todos.all()
            })

            // GET :id
            this.get('todo/:id', (schema: any, request) => {
                const todoID = request.params.id
                const todo = schema.todos.find(todoID)
                return {
                    todo: todo
                }
            })

            this.patch('todo/:id/edit', (schema: any, request) => {
                let attrs = JSON.parse(request.requestBody)
                let todoID = request.params.id
                let todo = schema.todos.find(todoID)
                let user = schema.users.find(attrs.user)
                todo.update({...attrs, user: user})
                return todo
            })

            // DEL :id
            this.get('todo/:id/delete', (schema: any, request) => {
                const todoID = request.params.id
                schema.todos.find(todoID).destroy()
                return {success: true}
            })

            // POST
            this.post('todo/create', (schema: any, request) => {
                let attrs = JSON.parse(request.requestBody)
                let user = schema.users.find(attrs.user)
                let newTodo = {...attrs, user:user}
                return schema.todos.create(newTodo)
            })
        },
    })
    return server
}