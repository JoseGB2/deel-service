//const superagent = require('superagent');

module.exports = () => {
	const { server } = app.getInstance();
	//getting token for each request to the salesloft
	return {
		authSalesLoftMiddleware: () => (req, res, next) => {
			//adding logic to add api_key
			console.log(req)
		}
	}
}