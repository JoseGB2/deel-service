const app = require('../utils/AppCore');
const superagent = require('superagent');

module.exports = (()=>{
  const {server, config } = app.getInstance();

  return {
    insertData: (params) => console.log() //get db conexion and insert data
  }
})();