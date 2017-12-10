import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: { type: String },
  email: { type: String },
  company_name: { type: String },
  category: { type: String },
  notes: { type: String },
  country: { type: String },
  address: { type: String },
  state: { type: String },
  zip: { type: String },
  cell_phone: { type: String },
  work_phone: { type: String },
  fax: { type: String },
  notes: { type: String },
});

mongoose.model('Contact', ContactSchema);
