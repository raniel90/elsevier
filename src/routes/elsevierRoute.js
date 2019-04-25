module.exports = (app) => {
  var elsevierController = require('../controllers/elsevierController');

  app.route('/api/elsevier').get(elsevierController.listAll);
};
