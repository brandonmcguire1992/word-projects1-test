const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');


const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
      },
      ideasText: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('MMM Do, YYYY')
      },    

});


module.exports = projectSchema;