// src/server.js
import { createServer, Model, Factory, } from 'miragejs';
import { faker } from '@faker-js/faker';

export function makeServer({ environment = 'development' } = {}) {
    faker.seed(123);
    const maxClassifierId = 6;
    let noOfCars = 10;

    const probabilities = [
        {
            id: 1,
            title: 'Low (<=10%)',
        },
        {
            id: 2,
            title: 'Medium (>=50%)',
        },
        {
            id: 3,
            title: 'Plausible (>=75%)',
        },
        {
            id: 4,
            title: 'Occurred (100%)',
        },
    ];

    const impacts = [
        {
            id: 1,
            title: 'Impossible (<=0.1%)',
        },
        {
            id: 2,
            title: 'Uncommon (<=1%)',
        },
        {
            id: 3,
            title: 'Rare (<=3%)',
        },
        {
            id: 4,
            title: 'Rather high (>= 5%)',
        },
        {
            id: 5,
            title: 'High (>= 10%)',
        },
    ];

    return createServer({
        environment,

        models: {
            probability: Model,
            impact: Model,
            category: Model,
            car: Model,
        },

        factories: {
            car: Factory.extend({
                title: () => faker.vehicle.vehicle(),
                description: faker.lorem.paragraph(),
                response: faker.lorem.paragraph(),
                category: () => faker.datatype.number({ min: 1, max: maxClassifierId, }),
                impact: () => faker.datatype.number({ min: 1, max: impacts.length, }),
                probability: () => faker.datatype.number({ min: 1, max: probabilities.length, }),
            }),
            category: Factory.extend({
                id: (i) => i+1,
                title: () => faker.vehicle.type(),
            }),
        },

        seeds(server) {
            server.createList('car', noOfCars);
            server.createList('category', maxClassifierId);

            probabilities.forEach((probability) => {
                server.create('probability', probability);
            });

            impacts.forEach((impact) => {
                server.create('impact', impact);
            });
        },

        routes() {
            this.namespace = 'api';

            this.get('/cars', (schema) => {
                return schema.cars.all().models;
            });
            this.post('/cars', (schema, request) => {
                let car = JSON.parse(request.requestBody);
                car.id = noOfCars++;

                return car;
            });
            this.put('/cars/:id', (schema, request) => {
                return JSON.parse(request.requestBody);
            });
            this.delete('/cars/:id', () => {
                return true;
            });

            this.get('/classifiers/categories', (schema) => {
                return schema.categories.all().models;
            });
            this.get('/classifiers/probabilities', (schema) => {
                return schema.probabilities.all().models;
            });
            this.get('/classifiers/impacts', (schema) => {
                return schema.impacts.all().models;
            });
        },
    });
}