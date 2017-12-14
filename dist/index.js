'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _db = require('./db/db');

var db = _interopRequireWildcard(_db);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('../config/config.json');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

app.post('/api/save_contact/', function (req, res) {
  var id = req.body._id;

  console.log('req.body', req.body);
  console.log('Id === ', id);

  var contact = new Contact();

  //contact.save().then(data => res.send(data));
  contact.findOneAndUpdate({ _id: id }, req.body, function (err, user) {
    console.log(err, 'err');
    console.log(user, 'user');
  });
});

app.get('/api/get_contact/:id', function (req, res) {
  var id = req.params.id;
  Contact.findById(id).then(function (data) {
    return res.send(data);
  });
});

app.get('/api/get_contacts', function (req, res) {
  var param = req.query;
  var page = Math.max(0, param.page) - 1;
  var limit = parseInt(param.limit);

  Contact.find({ "name": new RegExp('^' + param.term, "i") }).limit(limit).skip(page * limit).sort({
    name: 'asc'
  }).exec(function (err, contacts) {

    Contact.count({ "name": new RegExp('^' + param.term, "i") }).exec(function (err, total_records) {
      var param = {
        data: contacts,
        total_records: total_records
      };
      //console.log(param, 'param');

      res.send(param);
    });
  });

  // find({ occupation: /host/ }).
  // where('name.last').equals('Ghost').
  // where('age').gt(17).lt(66).
  // where('likes').in(['vaporizing', 'talking']).
  // limit(10).
});

app.get('/api/generate-fake-data', function (req, res) {

  for (var i = 0; i < 50; i++) {

    var contact = new Contact({
      name: _faker2.default.name.findName(),
      image: _faker2.default.image.avatar(),
      email: _faker2.default.internet.email(),
      company_name: _faker2.default.company.companyName(),
      category: '',
      country: _faker2.default.address.country(),
      address: _faker2.default.address.streetAddress(),
      state: _faker2.default.address.state(),
      zip: _faker2.default.address.zipCode(),
      cell_phone: _faker2.default.phone.phoneNumber(),
      work_phone: _faker2.default.phone.phoneNumber(),
      fax: _faker2.default.phone.phoneNumber()
    });

    contact.save(function (err, record) {
      if (err) throw err;
    });
  }
  res.redirect('/');
});

// app.post("/api/save_contact", (req, res) => {
//     //const param = req.query.q;
//     res.write('hello');
// // if (!param) {
// //     res.json({
// //         error: "Missing required parameter `q`"
// //     });
// //     return;
// // }
//
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