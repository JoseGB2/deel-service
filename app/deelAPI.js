const app = require('../utils/AppCore');
const { getPeople } = require('../libraries/deelDB')
const superagent = require('superagent');
const  { requestorIPMiddleware } = require('../middlewares/gettingIPMiddleware')

module.exports = () => {
  const { server, config, logger, routes } = app.getInstance();
  /**
   * GET /reverse-ip
   *
   * @param {string} pagination ...
   */
  server.get(routes.GET_IP,
    requestorIPMiddleware,
    //valid params
    //any other validation before passing the real stuff
    //implementing cache
    (req, res) => {
      logger.info('Reversing ip');
      let ip = req.params.publicIP
      let response = {
        status: 200,
        body: {
            reverseIP: ip.split('.').reverse().join('.')
          }
      }
      res.status(response.status).send(response.body);
    }
  );
}