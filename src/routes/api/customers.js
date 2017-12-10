'use strict';

const express = require('express');
const router = express.Router();
const Customer = require('../../model/customer');

const customerService = require('../../services/customer');

router.get('/', function (req, res, next) {

    let customers = customerService.get();

    res.send(customers);

});

router.get('/:id', function (req, res, next) {
    
    let customer = customerService.getById(req.params.id);

    if (customer)
        res.send(customer);
    else
        res.status(404).send('Customer not found');

});

router.post('/', function(req, res, next) {

    let customers = customerService.get();
    let id = 0;
    if (customers.length > 0)
    {
        id = customers[customers.length - 1].id;
    }

    let customer = new Customer(id + 1, req.body.firstname, req.body.lastname);
    customerService.add(customer);

    res.send(customer);

});

router.put('/:id', function(req, res, next) {
    
    let customer = customerService.getById(req.params.id);

    if (!customer)
    {
        res.status(404).send('Customer not found');
    }
    else
    {
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
    
        customerService.update(customer);
    
        res.send(customer);
    }
    
});

router.delete('/:id', function(req, res, next) {
    
    customerService.removeById(req.params.id);    
    res.send();

});

module.exports = router;