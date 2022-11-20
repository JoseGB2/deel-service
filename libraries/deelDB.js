const app = require('../utils/AppCore');
const superagent = require('superagent');
//const mongoose = require('mongoose');

module.exports = (()=>{
  const { DBConfig } = app.getInstance();

  return {
    insertIP: (ip, reverse) => {
      const ReverseIP = DBConfig.model
      let document = new ReverseIP({ ip: ip, reverseIp: reverse, dateAdded: Date.now()})

      return new Promise(function(resolve, reject) {
        document.save((err,data) => {
              err ? reject(err) : resolve(data);
        });
      });
    }
  }
})();