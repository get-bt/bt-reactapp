import {
    Server,
    Model,
    belongsTo,
    hasMany,
    RestSerializer,
    Factory,
    JSONAPISerializer
} from "miragejs";
import {faker} from '@faker-js/faker';

export function makeServer () {
    const server = new Server({
        serializers: {
            // application: JSONAPISerializer.extend({
            //     alwaysIncludeLinkageData: true
            // }),
            // todos: RestSerializer.extend({
            //     include:["user"],
            //     embed: true
            // }),
            todo: RestSerializer.extend({
                serializeIds:"always",
                
            }),
            users: RestSerializer.extend({
                include:["todo"],
                embed: true
            }),
            // user: RestSerializer.extend({
            //     serializeIds:"always",
            // })
            
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
                isComplete: false
            })
        },
        seeds(server) {
            const users = server.createList("user", 5);
            users.forEach(user => {
                server.createList("todo", faker.datatype.number({max: 4}), {user:user} as any)
            });
        },
        routes() {
            this.namespace = 'api'

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

            // My own addition - can ignore.
            // this.get('todo/:id/user', (schema: any, request) => {
            //     const todoID = request.params.id
            //     const todo = schema.todos.find(todoID)
            //     const userID = todo.userId
            //     const user = schema.users.find(userID)
            //     return {user: user}
            // })

            // POST
            this.get('todo/create', (schema: any, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.todos.create(attrs)
            })
        },
    })
    return server
}