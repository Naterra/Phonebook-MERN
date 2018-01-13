'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db/db');

var db = _interopRequireWildcard(_db);

var _config = require('../config/config.json');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('./db/models/Contact');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import faker from 'faker';

// Initialization of express application
var app = (0, _express2.default)();

// Set up connection of database

var Contact = _mongoose2.default.model('Contact');
db.setUpConnection();

// Using bodyParser middleware
app.use(_bodyParser2.default.json());

// Allow requests from any origin
app.use((0, _cors2.default)({ origin: '*' }));
app.set('port', process.env.PORT || _config.serverPort);

// Save/Update Contact
app.post('/api/save_contact/', function (req, res) {
	var id = req.body._id;
	console.log('Id === ', id);

	if (id) {
		Contact.findOneAndUpdate({ _id: id }, req.body, function (err, user) {
			if (err) {
				res.send({ status: 'error' });
			} else {
				res.send({ status: 'ok' });
			}
		});
	} else {
		var new_contact = Contact(req.body);
		new_contact.save(function (err, product) {
			if (!err) {
				res.send({ status: 'ok' });
			}
		});
	}
});

// Delete Contact
app.post('/api/delete_contact/', function (req, res) {
	var id = req.body.id;
	Contact.findOneAndRemove({ _id: id }, function (err, doc) {
		if (!err) {
			res.send({ status: 'ok' });
		}
	});
});

// Get single Contact record
app.get('/api/get_contact/:id', function (req, res) {
	var id = req.params.id;
	Contact.findById(id).then(function (data) {
		return res.send(data);
	});
});

//Get all Contacts with filter
app.get('/api/get_contacts', function (req, res) {
	var param = req.query;
	var page = Math.max(0, param.page) - 1;
	var limit = parseInt(param.limit);

	Contact.find({ name: new RegExp('^' + param.term, 'i') }).limit(limit).skip(page * limit).sort({
		name: 'asc'
	}).exec(function (err, contacts) {
		Contact.count({ name: new RegExp('^' + param.term, 'i') }).exec(function (err, total_records) {
			var param = {
				data: contacts,
				total_records: total_records
			};
			//console.log(param, 'param');

			res.send(param);
		});
	});
});

app.get('/api/generate-fake-data', function (req, res) {
	//
	//   for (var i = 0; i < 50; i++) {
	//
	//   const contact = new Contact({
	//     name: faker.name.findName(),
	//     image: faker.image.avatar(),
	//     email: faker.internet.email(),
	//     company_name: faker.company.companyName(),
	//     category: '',
	//     country: faker.address.country(),
	//     address: faker.address.streetAddress(),
	//     state: faker.address.state(),
	//     zip: faker.address.zipCode(),
	//     cell_phone: faker.phone.phoneNumber(),
	//     work_phone: faker.phone.phoneNumber(),
	//     fax: faker.phone.phoneNumber()
	//   });
	//
	//   contact.save((err, record) => {
	//     if (err) throw err;
	//   });
	// }
	// res.redirect('/');
});

// });

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file

	app.use(_express2.default.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	// If express didn't find any route matches listed above,
	// will try to find in client/build
	var path = require('path');

	app.get('*', function (req, res) {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(app.get('port'), function () {
	console.log('Server is up and running on port ' + app.get('port'));
});