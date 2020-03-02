module.exports = {
	isLoggedIn(req, res, next) {
//Passport añade al objeto
	if (req.isAuthenticated()) {
		return next();
	}
	return res.redirect('/login');
},

isNotLoggedIn (req, res, next) {
	if (!req.isAuthenticated()) {
	return next();
	}
return res.redirect('/perfil');
}
};