'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const customersRoute = require('../../src/routes/api/customers');

describe('Customers api', () => {

    let agent, app;

    before(() => {
        app = express();
        app.use(bodyParser.json());
        app.use('/customers', customersRoute);
    });

    beforeEach(() => {
        agent = request.agent(app);
    });

    describe('/customers', () => {
    
        it('should return all customers', (done) => {
    
            agent.get('/customers')
                .expect(200, done);
    
        });

    });

    
    describe('/customers/:id', () => {
    
        it('should return existing customer', (done) => {
    
            agent.get('/customers/1')
                .expect(200, done);
    
        });
    
        it('should return 404 for non existing customer', (done) => {
    
            agent.get('/customers/1000')
                .expect(404, done);
    
        });

    });


});