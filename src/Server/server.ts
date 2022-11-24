import {
    Server,
    Model,
    belongsTo,
    hasMany,
    RestSerializer,
    Factory
} from "miragejs";
import * as faker from '@faker-js/faker';

export function makeServer () {
    const server = new Server({
        serializers: {
            todo: RestSerializer.extend({
                serializeIds:"always",
            })
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
                    return faker.faker.name.firstName()
                },
                lastName() {
                    return faker.faker.name.lastName()
                }
            }),
            todo: Factory.extend({
                name() {
                    return faker.faker.random.words(4)
                },
                isComplete: false
            })
        },
        seeds(server) {
            const users = server.createList("user", 5);
            users.forEach(user => {
                server.createList("todo", faker.faker.datatype.number({max: 4}), {user:user} as any)
            });
        },
        routes() {
            this.namespace = 'api'

            // User APIs

            // GET ALL
            this.get('/users', (schema: any) => {
                return schema.users.all()
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
            this.get('/todos', (schema: any, request) => {
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

            // DEL :id
            this.get('/todo/:id/delete', (schema: any, request) => {
                const todoID = request.params.id
                schema.todos.find(todoID).delete()
                return {success: true}
            })

            // POST
            this.get('todo/create', (schema: any, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.todos.create(attrs)
            })
        },
    })
    return server
}