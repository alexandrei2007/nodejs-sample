'use strict';

const Customer = require('../model/customer');

const customers = [];
customers.push(new Customer(1, 'Stebe', 'Jobs'));
customers.push(new Customer(2, 'Bill', 'Gates'));
customers.push(new Customer(3, 'Jeff', 'Bezos'));

module.exports.get = () => {
    return customers;
};

module.exports.getById = (id) => {
    return customers.find(c => c.id === parseInt(id, 10));
}

module.exports.add = (customer) => {
    if (customer instanceof Customer == false)
        throw new Error('Invalid customer');

    if (!customer.firstname)
        throw new Error('Firstname is required');

    var id_exists = this.getById(customer.id);
    if (id_exists)
        throw new Error('Id already exists');

    customers.push(customer);
}

module.exports.removeById = (id) => {

    var customer = this.getById(id);

    if (!customer)
        throw new Error('Customer not found');

    var index = customers.indexOf(customer);
    customers.splice(index, 1);

};