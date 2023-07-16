const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  "id": {
    "type": Number,
    "unique": true
  },
  "name": {
    "type": String
  },
  "neighborhood": {
    "type": String
  },
  "photograph": {
    "type": String
  },
  "address": {
    "type": String
  },
  "latlng": {
    "lat": {
      "type": Number
    },
    "lng": {
      "type": Number
    }
  },
  "cuisine_type": {
    "type": String
  },
  "operating_hours": {
    "Monday": {
      "type": String
    },
    "Tuesday": {
      "type": String
    },
    "Wednesday": {
      "type": String
    },
    "Thursday": {
      "type": String
    },
    "Friday": {
      "type": String
    },
    "Saturday": {
      "type": String
    },
    "Sunday": {
      "type": String
    }
  },
  "reviews": [
    {
      "name": String,
      "data": String,
      "rating": Number,
      "comments": String
    }
  ]
});

const Restaurant = mongoose.model('Restaurant', schema);

module.exports = {Restaurant};
