const usuariosModel = require('../models/usuariosModel')()
const urlbase = "usuarios";
const nomesingular = "Usuario";
const nomeplural = "Usuarios";

class usuariosController {

   async index(req, res) {
      var usuarios = await usuariosModel['select' + nomeplural]();
      res.render(urlbase + '/index.njk', {
         urlbase: urlbase,
         usuarios: usuarios
      });

   };

   async visualizar(req, res) {
      var usuario = await usuariosModel['select' + nomesingular](req.params.id);
      res.render(urlbase + '/visualizar.njk', {
         urlbase: urlbase,
         usuario: usuario
      });
   };

   adicionar(req, res) {
      res.render(urlbase + '/adicionar.njk', {
         urlbase: urlbase,
      });
   };

   async postadicionar(req, res) {
      try {
         var usuarios = await usuariosModel['adiciona' + nomesingular](req.body);
         req.flash('info', 'Cadastro realizado com sucesso!');
         res.redirect(urlbase);

      } catch (error) {
         req.flash('erro', 'Erro ao cadastrar: ' + error);
         res.redirect(urlbase);

      }
   };

   async editar(req, res) {
      var usuario = await usuariosModel['select' + nomesingular](req.params.id);
      res.render(urlbase + '/editar.njk', {
         urlbase: urlbase,
         usuario: usuario
      });
   };

   async posteditar(req, res) {
      try {
         var usuarios = await usuariosModel['edita' + nomesingular](req.params.id, req.body);
         req.flash('info', 'Cadastro editado com sucesso!');
         res.redirect(urlbase);
      } catch (error) {
         req.flash('erro', 'Erro ao editar: ' + error);
         res.redirect(urlbase);

      }
   };

   async deletar(req, res) {
      try {
         var usuarios = await usuariosModel['deleta' + nomesingular](req.params.id);
         req.flash('info', 'Cadastro deletado com sucesso!');
         res.redirect(urlbase);
      } catch (error) {
         req.flash('erro', 'Erro ao deletar: ' + error);
         res.redirect(urlbase);
      }
   };
}
module.exports = new usuariosController()