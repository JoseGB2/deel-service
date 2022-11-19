const appInstance = require('./utils/AppCore');

appInstance
    .construct({
          appDir: __dirname,
    }).then((app)=> {
          app.server.listen(app.config.api_port || 8080);
    }).catch((err) => console.log(err));
