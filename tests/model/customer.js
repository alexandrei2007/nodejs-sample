'use strict';

let Customer = require('../../src/model/customer');
const expect = require('chai').expect;

describe('Customer model', () =>{

    it('getFullname should return both firstname and lastname', () => {

        let customer = new Customer(1000, 'John', 'Smith');
        expect(customer.getFullname()).equal('John Smith');

    });

});