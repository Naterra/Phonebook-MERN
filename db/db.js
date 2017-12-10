import mongoose from "mongoose";
import config from '../config/config.json';
import './models/Contact';

const Contact = mongoose.model('Contact');

export function setUpConnection() {
    mongoose.connect(`mongodb://naterra:305762@ds133746.mlab.com:33746/phonebook`);
    //mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    //console.log(mongoose, 'mongoose connect !!!');
}