const app = require('../utils/AppCore');
const superagent = require('superagent');

module.exports = (()=>{
  const {server, config, salesloftConfig } = app.getInstance();

  return {
    getPeople: (params) =>
        superagent.get(`${config.salesloft_domain}/people.json`)
          .set('Authorization', `Bearer ${salesloftConfig.API_KEY_SALESLOFT}`)
          .then(response => response.body)
  }
})();