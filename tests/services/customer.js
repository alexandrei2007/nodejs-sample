'use strict';

const Customer = require('../../src/model/customer');
const service = require('../../src/services/customer');
const expect = require('chai').expect;

describe('Customers service', () => {

    beforeEach(() => {

    });

    it('should return all customers', () => {

        let customers = service.get();

        expect(customers).to.be.an('array');
        expect(customers.length).to.equal(3);

    });

    it('should return a customer by id', () => {

        let customer_id = 2;

        let customer = service.getById(customer_id);
        expect(customer).to.not.equal(undefined);
        expect(customer.id).to.equal(customer_id);
        expect(customer.firstname).to.equal('Bill');

    });

    it('should return undefined by a non existing customer id', () => {

        let customer = service.getById(999);
        expect(customer).to.equal(undefined);

    });

    it('should add a new user', () => {

        let customer_id = 400;
        let customer = new Customer(customer_id, 'Anyone', 'Else');
        service.add(customer);

        let existing = service.getById(customer_id);
        expect(existing).not.equal(undefined);
        expect(existing.id).equal(customer_id);

    });

    it('should update an user', () => {

        let customer_id = 700;
        let customer = new Customer(customer_id, 'Someone', 'Else');
        service.add(customer);

        customer.firstname = 'Firstname';
        customer.lastname = 'Lastname';
        service.update(customer);

        let existing = service.getById(customer_id);
        expect(customer.firstname).equal('Firstname');
        expect(customer.lastname).equal('Lastname');
        expect(existing.id).equal(customer_id);

    });

    it('should throw an error by adding an invalid user instance', () => {

        expect(() => {
            service.add({
                id: 2000, firstname: 'John', lastname: 'Smith'
            });
        }).to.throw(/Invalid customer/);

    });

    it('should throw an error by adding an user with empty firstname', () => {

        let customer = new Customer(1000);
        expect(() => {
            service.add(customer);
        }).to.throw(/Firstname is required/);

    });

    it('should throw an error by adding an user with existing id', () => {

        let customer = new Customer(1, 'John');
        expect(() => {
            service.add(customer);
        }).to.throw(/Id already exists/);

    });

    it('should remove an user', () => {

        let customer_id = 500;
        let customer = new Customer(customer_id, 'Anyone', 'Else');
        service.add(customer);

        let existing = service.getById(customer_id);
        expect(existing.id).equal(customer_id);

        // removes
        service.removeById(customer_id);

        existing = service.getById(customer_id);
        expect(existing).equal(undefined);

    });

    it('should throw an error by removing non existing user', () => {

        let customer_id = 999;
        expect(() => {
            service.removeById(customer_id);
        }).to.throw(/not found/);


    });

});