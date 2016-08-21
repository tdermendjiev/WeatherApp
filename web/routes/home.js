var Arrow = require('arrow');

var HomeRoute = Arrow.Router.extend({
	name: 'home',
	path: '/home',
	method: 'GET',
	description: 'Home',
	action: function (req, res , next) {
		res.render('home');
	}
});

module.exports = HomeRoute;