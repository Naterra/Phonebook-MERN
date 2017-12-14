"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUpConnection = setUpConnection;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

require("./models/Contact");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Contact = mongoose.model('Contact');

function setUpConnection() {
    _mongoose2.default.connect("mongodb://naterra:305762@ds133746.mlab.com:33746/phonebook");
    //mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    //console.log(mongoose, 'mongoose connect !!!');
}