//const superagent = require('superagent');
const app = require('../utils/AppCore');
const errorResponse = require('../utils/errorResponse');

module.exports = (() => {
	const { logger } = app.getInstance();
	return {
		requestorIPMiddleware: (req, res, next) => {
			logger.debug('getting ip from headers');

			if(!req.headers['x-forwarded-for']){
				const error = errorResponse.retrieveError('NOT_FOUND');
				res.status(error.status).send(error.message);
			} else {
				req.params = {
					publicIP: req.headers['x-forwarded-for'].split(',')[0]
				}
				next()
			}
		}
	}
})()