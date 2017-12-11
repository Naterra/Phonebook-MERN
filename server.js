import express from 'express';
import cors from 'cors';
import * as db from './db/db';
import bodyParser from 'body-parser';
import { serverPort } from './config/config.json';
import faker from 'faker';

import mongoose from 'mongoose';
const Contact = mongoose.model('Contact');

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));
app.set('port', process.env.PORT || serverPort);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  //app.use(express.static("client/build"));
}

app.get('/api/get_contacts', (req, res) => {
  const param = req.query;
  console.log(param, 'param');

  // Contact.find(param).then(data => res.send(data));
  let perPage = param.limit,
      page = Math.max(0, param.page);

  Contact.find()
    .select('name')
    .limit(perPage)
    .skip(perPage * page)
    .sort({
      name: 'asc'
    })
    .exec(function(err, data) {
      console.log(data, 'data');
      // Contact.count().exec(function(err, count) {
      //   res.render('contacts', {
      //     events: events,
      //     page: page,
      //     pages: count / perPage
      //   });
      // });
    });

  //Find total

  //Retun object {
  // contacts:[],
  // total:123
  // }

  // find({ occupation: /host/ }).
  // where('name.last').equals('Ghost').
  // where('age').gt(17).lt(66).
  // where('likes').in(['vaporizing', 'talking']).
  // limit(10).
});

app.get('/api/generate-fake-data', (req, res) => {
  // res.send({kuku:'yes'});

  for (var i = 0; i < 2; i++) {
    console.log('new_cont ' + i);

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
      console.log('+++ New Contact created');
      // res.send(record);
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

app.listen(serverPort, () => {
  console.log(`Server is up and running on port ${serverPort}`);
});
