'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ContactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  company_name: { type: String },
  category: { type: String },
  country: { type: String },
  address: { type: String },
  state: { type: String },
  zip: { type: String },
  cell_phone: { type: String },
  work_phone: { type: String },
  fax: { type: String },
  notes: { type: String }
});

_mongoose2.default.model('Contact', ContactSchema);