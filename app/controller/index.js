const usuariosModel = require('../models/usuariosModel')()
const urlbase = "";
const md5 = require("md5");

class indexController {

   index(req, res) {
      res.render('index.njk', {});
    };

   login(req, res) {
      if (typeof req.session.loginusuario === 'undefined') {
        res.render(urlbase+'index/login.njk', {});
      } else {
        res.redirect('/index');
      }
    };
  
    async autenticacao(req, res) {
      let email = req.body.email;
      let password = md5(req.body.password);
      var usuario = await usuariosModel['autenticaUsuario'](email, password);
  
      if (usuario.length > 0) {
         console.log("Teste");
        req.session.loginusuario = usuario[0];
        console.log(req.session.loginusuario);
        res.redirect('/admin/index');
  
      } else {
        console.log("Errou a senha");
        req.flash('erro', 'E-mail ou senha errado.');
        res.redirect('/');
      }
    };
  
  
    logout(req, res) {
      req.session.destroy();
      res.redirect('/');
    }
 
}
module.exports = new indexController()

