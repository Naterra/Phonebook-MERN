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

app.post('/api/save_contact/', (req, res) => {
const id = req.body._id;

  console.log('req.body', req.body);
  console.log('Id === ', id);

    const contact = new Contact();

    //contact.save().then(data => res.send(data));
    contact.findOneAndUpdate({_id: id}, req.body, (err, user) => {
      console.log(err, 'err');
      console.log(user, 'user');
    });

});

app.get('/api/get_contact/:id', (req, res) => {
    const id = req.params.id;
    Contact.findById(id).then(data => res.send(data));
});


app.get('/api/get_contacts', (req, res) => {
  const param = req.query;
  let page = Math.max(0, param.page) - 1;
  let limit = parseInt(param.limit);

  Contact.find({"name": new RegExp('^'+param.term, "i") })
    .limit(limit)
    .skip(page * limit)
    .sort({
      name: 'asc'
    })
    .exec(function(err, contacts) {

      Contact.count({"name": new RegExp('^'+param.term, "i") }).exec(function(err, total_records) {
        const param = {
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
