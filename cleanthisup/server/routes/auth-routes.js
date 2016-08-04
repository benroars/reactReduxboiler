const AuthController = require('./../controllers/AuthController.js');

module.exports = (app) => {
  app.post('/api/login', AuthController.login);
  app.post('/api/logout', AuthController.logout);
  app.post('/api/signup', AuthController.signup);
};
