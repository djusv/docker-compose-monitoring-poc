import mongoose from "npm:mongoose@7.3.4";

const schema = new mongoose.Schema({
  "id": {
    "type": Number,
    "unique": true,
  },
  "name": {
    "type": String,
  },
});

const Contact = mongoose.model("Contact", schema);

export { Contact };
