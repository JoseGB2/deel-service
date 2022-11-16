const app = require('../utils/AppCore');
const { getPeople } = require('../libraries/salesLoftApi')
const superagent = require('superagent');

module.exports = () => {
  const { server, config, salesloftConfig, logger, routes } = app.getInstance();
  /**
   * GET /people
   *
   * @param {string} pagination ...
   */
  server.get(routes.GET_PEOPLE,
    //auth
    //valid params
    //any other validation before passing the real stuff
    //implementing cache
    (req, res, next) => {
      logger.info('getting data from api salesloft');
      superagent.get(`${config.salesloft_domain}/people.json`)
          .set('Authorization', `Bearer ${salesloftConfig.API_KEY_SALESLOFT}`)
          .then(response => res.status(200).send(response.body))
    }
  );
}