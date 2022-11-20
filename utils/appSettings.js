const Express = require('express');
const winston = require('winston');
const compression = require('compression');

const jsonSchema = require('jsonschema').Validator;
const Validator = new jsonSchema();

const helmet = require('helmet');

const bodyParser = require('body-parser');

const errorResponse = require('./errorResponse');
const mongoose = require('mongoose')


const fs = require('fs');

module.exports = class App {
  /**
 * Constructor for the AppSettings
 */
  Constructor() {
    this.logger = null;

    this.server = null;

    this.routes = {};

    this.config = {};

    this.appDir = null;

    //salesloft config
    this.DBConfig = {};
  }
  /** 
 * @typedef {object} settings 
 * @param app_dir -the top-level directory
 * @return Promise
 */
  initialize(settings) {
    const logger = winston.createLogger({
      format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
          }),
          winston.format.errors({stack: true}),
          winston.format.splat(),
          winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple() 
            )
        }),
      ],
    });

    this.logger = logger;

    if (process.env.NODE_ENV === 'development') { // log_level depending on environment
      this.logger.level = 'debug';
    } else {
      this.logger.level = 'info';
    }

    this.appDir = settings.appDir;
    this.routes = require(`${this.appDir}/config/routes`);

    // initializing server
    this.server = Express();

    return this.loadConfig().then(() => {
      this.logger.defaultMeta = {
        service: this.config.api_name,
      };

      //create dbconection
      let dbName = process.env.DBNAME
      let dbUser = process.env.DBUSER
      let dbPass = process.env.DBPWD

      let dbStringConnection = `mongodb+srv://${dbUser}:${dbPass}@${dbName}`
      this.DBConfig = mongoose.connect(dbStringConnection);
      this.DBConfig.model = ('Ip', require('../models/ipModel'));


      // Enable CORS, allowing everithing NOT COOL, remove
      this.server.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*'); //
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });
      
      // TODO: improve this loading the route files
      require(`${this.appDir}/app/system`)();
      require(`${this.appDir}/app/deelAPI`)();

      //loading middlewares
      this.loadMiddlewares(); 

    }).catch((err) => this.logger.error(err));
  }

  loadConfig() {
    this.logger.debug('validating schema against config.json file');
    const addressSchema = {
      'type': 'object',
      'properties': {
        'api_version': {'type': 'string'},
        'api_name': {'type': 'string'},
        'api_port': {'type': 'number'},
        'api_port_key_name': {'type': 'string'}
      },
      'required': ['api_name', 'api_version', ],
    };

    return this.readFile(`${this.appDir}/config/config.json`).then((data) =>{
      this.config = JSON.parse(data);
      const validate = Validator.validate(this.config, addressSchema, {throwError: true});
    }).catch((err) => {
      this.logger.error(err);
      process.exit(0);
    });
  }

  readFile(fileName) {
    return new Promise(function(resolve, reject) {
      fs.readFile(fileName, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data);
      });
    });
  }

  loadMiddlewares() {
    this.logger.debug('setting up middlewares');
    // Disable X-Powered-By Express
    this.server.disable('x-powered-by');
    this.server.use(helmet());
    this.server.use(bodyParser.urlencoded({extended: false}));
    this.server.use(bodyParser.json());

    // Enable gzip compression
    this.server.use(compression()); //use compression to get better performance

    const error = errorResponse.retrieveError('NOT_FOUND');
    this.server.use((req, res) => {
      res.status(error.status).send(error.message);
    }); // error hanlder
  }
};
