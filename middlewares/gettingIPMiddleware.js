//const superagent = require('superagent');
const app = require('../utils/AppCore');

module.exports = (() => {
	const { logger } = app.getInstance();
	return {
		requestorIPMiddleware: (req, res, next) => {
			console.log(req.headers)
			console.log('-----------')
			console.log(req)
			logger.debug('getting ip from headers');
			req.params = {
				publicIP: "1.2.3.4"
			}
			next()
		}
	}
})()