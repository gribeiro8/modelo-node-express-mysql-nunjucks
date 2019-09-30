const urlpadrao = "/usuarios";
const controller = require('../controller' + urlpadrao);
let autenticar = require('../middleware/autenticar');

module.exports = (application) => {

  application
    .route(urlpadrao)
    .get(controller.index);

  application
    .route(urlpadrao + '/visualizar/:id')
    .get(controller.visualizar);

  application
    .route(urlpadrao + '/adicionar')
    .get(controller.adicionar)
    .post(controller.postadicionar)

  application
    .route(urlpadrao + '/editar/:id')
    .get(controller.editar)
    .post(controller.posteditar)

  application
    .route(urlpadrao + '/deletar/:id')
    .get(controller.deletar)

};