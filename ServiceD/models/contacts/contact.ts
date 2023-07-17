import mongoose from "mongoose";

const schema = new mongoose.Schema({
  "id": {
    "type": Number,
    "unique": true
  },
  "name": {
    "type": String
  }
});

const Contact = mongoose.model('Contact', schema);

export {Contact};
