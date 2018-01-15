import mongoose from "mongoose";
import config from '../../config/config.js';

export function setUpConnection() {
   mongoose.connect(config.mongo_URL);
}
