
const App = require('./appSettings');

let instance = null;

module.exports = {
    construct: (settings) => {
      if (instance !== null) {
        return instance;
      }

      const app = instance = new App();
      return app.initialize(settings).then(()=>{
        app.logger.info({
          message: `your app is running on localhost port:${app.config.port || 8080}`,
        });
        return app;
      }).catch((err) => app.logger.error(err));
    },
    destruct: () => {
      if (instance === null) {
        app.logger.error('can not delete any instace');
      }
      instance.server.close();
      instance = null;
    },
    getInstance: () => {
      if (instance === null) {
        console.log('can not delete any instace');
      }
      return instance;
    },
};
