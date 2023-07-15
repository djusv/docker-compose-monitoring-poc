const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant', {
  "id": {
    "type": "Number"
  },
  "name": {
    "type": "String"
  },
  "neighborhood": {
    "type": "String"
  },
  "photograph": {
    "type": "String"
  },
  "address": {
    "type": "String"
  },
  "latlng": {
    "lat": {
      "type": "Number"
    },
    "lng": {
      "type": "Number"
    }
  },
  "cuisine_type": {
    "type": "String"
  },
  "operating_hours": {
    "Monday": {
      "type": "String"
    },
    "Tuesday": {
      "type": "String"
    },
    "Wednesday": {
      "type": "String"
    },
    "Thursday": {
      "type": "String"
    },
    "Friday": {
      "type": "String"
    },
    "Saturday": {
      "type": "String"
    },
    "Sunday": {
      "type": "String"
    }
  },
  "reviews": {
    "type": [
      "Mixed"
    ]
  }
});

module.exports = {Restaurant};
