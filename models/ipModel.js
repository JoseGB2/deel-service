const mongoose = require('mongoose');


const reverseIpSchema = new mongoose.Schema({
    ip: {
      type: String,
      required: true,
    }, 
    reverseIp: {
      type: String,
      required: true,
    },
    dateAdded: {
      type: Date
   }
  })
  
module.exports = mongoose.model('ReverseIP',reverseIpSchema)