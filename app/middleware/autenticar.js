module.exports = function (req, res, next) {

   const caminho = caminhostatic == "" ? "/" : caminhostatic + "/";
   if (req.session.loginusuario) {
      return next();
   }
   return res.redirect(caminho);
}