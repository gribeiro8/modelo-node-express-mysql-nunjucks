const controller = require('../controller/index');
let autenticar = require('../middleware/autenticar');
let prefixo = "/";

module.exports = (application) => {
   application
      .route('/')
      .get(controller.index)
      .post(controller.autenticacao);

   application
      .route('/login')
      .get(controller.index);

   application
      .route('/logout')
      .get(autenticar, controller.logout);
};