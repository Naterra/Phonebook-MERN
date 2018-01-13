"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setUpConnection = setUpConnection;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("../../config/config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setUpConnection() {
    _mongoose2.default.connect("mongodb://" + _config2.default.db.user + ":" + _config2.default.db.password + "@ds" + _config2.default.db.ds + ".mlab.com:" + _config2.default.db.port + "/" + _config2.default.db.name);
}