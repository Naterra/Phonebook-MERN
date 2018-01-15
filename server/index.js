import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db from './db/db';
import config from '../config/config.js';
import faker from 'faker';

console.log(config, 'config');

// Initialization of express application
const app = express();

// Set up connection of database
import mongoose from 'mongoose';
import './db/models/Contact';
const Contact = mongoose.model('Contact');
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));
app.set('port', process.env.PORT || config.serverPort);

// Save/Update Contact
app.post('/api/save_contact/', (req, res) => {
	const id = req.body._id;
	console.log('Id === ', id);

	if (id) {
		Contact.findOneAndUpdate({ _id: id }, req.body, (err, user) => {
			if (err) {
				res.send({ status: 'error' });
			} else {
				res.send({ status: 'ok' });
			}
		});
	} else {
		const new_contact = Contact(req.body);
		new_contact.save(function(err, product) {
			if (!err) {
				res.send({ status: 'ok' });
			}
		});
	}
});

// Delete Contact
app.post('/api/delete_contact/', (req, res) => {
	const id = req.body.id;
	Contact.findOneAndRemove({ _id: id }, function(err, doc) {
		if (!err) {
			res.send({ status: 'ok' });
		}
	});
});

// Get single Contact record
app.get('/api/get_contact/:id', (req, res) => {
	const id = req.params.id;
	Contact.findById(id).then(data => res.send(data));
});

//Get all Contacts with filter
app.get('/api/get_contacts', (req, res) => {
	const param = req.query;
	let page = Math.max(0, param.page) - 1;
	let limit = parseInt(param.limit);

	Contact.find({ name: new RegExp('^' + param.term, 'i') })
		.limit(limit)
		.skip(page * limit)
		.sort({
			name: 'asc'
		})
		.exec(function(err, contacts) {
			Contact.count({ name: new RegExp('^' + param.term, 'i') }).exec(function(err, total_records) {
				const param = {
					data: contacts,
					total_records: total_records
				};
				//console.log(param, 'param');

				res.send(param);
			});
		});
});

app.get('/api/generate-fake-data', (req, res) => {
	for (var i = 0; i < 50; i++) {
		const contact = new Contact({
			name: faker.name.findName(),
			image: faker.image.avatar(),
			email: faker.internet.email(),
			company_name: faker.company.companyName(),
			category: '',
			country: faker.address.country(),
			address: faker.address.streetAddress(),
			state: faker.address.state(),
			zip: faker.address.zipCode(),
			cell_phone: faker.phone.phoneNumber(),
			work_phone: faker.phone.phoneNumber(),
			fax: faker.phone.phoneNumber()
		});

		contact.save((err, record) => {
			if (err) throw err;
		});
	}
	res.redirect('/');
});

// });

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file

	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	// If express didn't find any route matches listed above,
	// will try to find in client/build
	const path = require('path');

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(app.get('port'), () => {
	console.log(`Server is up and running on port ${app.get('port')}`);
});
