'use strict';

module.exports = class Customer {

    constructor (id, firstname, lastname) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    getFullname() {
        return this.firstname + ' ' + this.lastname;
    }

};