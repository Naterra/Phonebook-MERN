import express from 'express';
import  * as db from './db/db';
import bodyParser from 'body-parser';
import {serverPort} from './config/config.json';

//OLD
// const express = require('express');
// const db = require('./db/db');

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

console.log(db, 'db');
// Using bodyParser middleware
app.use( bodyParser.json() );


// Allow requests from any origin
//app.use(cors({ origin: '*' }));



app.set("port", process.env.PORT || serverPort);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    //app.use(express.static("client/build"));
}



app.get("/api/get_contacts", (req, res) => {
    //const param = req.query.q;
res.write('hello');
// if (!param) {
//     res.json({
//         error: "Missing required parameter `q`"
//     });
//     return;
// }

});

app.post("/api/save_contact", (req, res) => {
    //const param = req.query.q;
    res.write('hello');
// if (!param) {
//     res.json({
//         error: "Missing required parameter `q`"
//     });
//     return;
// }

});

 app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
