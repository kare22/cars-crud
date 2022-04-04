// src/server.js
import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
    return createServer({
        environment,

        models: {
            user: Model,
            car: Model,
        },

        seeds(server) {
            server.create('user', { name: 'Bob' }); 
            server.create('user', { name: 'Alice' });
            server.create('car', { name: 'Wrumm Humm' });
        },

        routes() {
            this.namespace = 'api';

            this.get('/users', (schema) => {
                return schema.users.all();
            });

            this.get('/cars', (schema) => {
                return schema.cars.all();
            });
        },
    });
}