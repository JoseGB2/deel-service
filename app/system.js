const app = require('../utils/AppCore');

module.exports = () => {
  const { server, routes } = app.getInstance();
  // logger.info('starting a new endpoint')
  server.get(routes.HEALTH, (req, res) => {
    res.status(200).send();
  });
};
