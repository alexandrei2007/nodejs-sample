'use strict';

const Customer = require('../model/customer');
const ServiceError = require('../model/serviceError');

const customers = [];
customers.push(new Customer(1, 'Stebe', 'Jobs'));
customers.push(new Customer(2, 'Bill', 'Gates'));
customers.push(new Customer(3, 'Jeff', 'Bezos'));

module.exports.validateCustomer = (customer, validateId = false) => {

    if (customer instanceof Customer == false)
    throw new ServiceError('Invalid customer');

    if (!customer.firstname)
        throw new ServiceError('Firstname is required');

    if (validateId)
    {
        let id_exists = this.getById(customer.id);
        if (id_exists)
            throw new ServiceError('Id already exists');
    }
    
};

module.exports.get = () => {
    return customers;
};

module.exports.getById = (id) => {
    return customers.find(c => c.id === parseInt(id, 10));
};

module.exports.add = (customer) => {
    this.validateCustomer(customer, true);

    customers.push(customer);
};

module.exports.update = (customer) => {
    this.validateCustomer(customer, false);

    let index = customers.indexOf(customer);
    customers[index] = customer;
};

module.exports.removeById = (id) => {

    let customer = this.getById(id);

    if (!customer)
        throw new ServiceError('Customer not found');

    let index = customers.indexOf(customer);
    customers.splice(index, 1);

};