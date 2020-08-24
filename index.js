const mongoose = require('mongoose');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli', { useNewUrlParser: true, useUnifiedTopology: true });

// Import model
const Customer = require('./models/Customer');

// Add customer
const addCustomer = customer => {
	Customer
		.create(customer)
		.then(cust => {
			console.info('New customer added.');
			mongoose.connection.close();
		});
}

// Find customer
const findCustomer = name => {
	// Make case insensitive
	const search = new RegExp(name, 'i');

	Customer.find({$or: [{firstname: search}, {lastname: search}]})
		.then(customer => {
			console.info(customer);
			console.info(`${customer.length} matches`);
			mongoose.connection.close();
		});
}

module.exports = {
	addCustomer,
	findCustomer
}