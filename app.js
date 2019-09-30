var app = require('./config/server.js');
var http = require('http');
const acesso = 'desenv';

if (acesso != 'desenv') {
  app.use(function (req, res, dev) {
    res.status(400);
    res.render('index/erro', {
      numero: "404",
      mensagens: [
        "Página não encontrada.",
        "Infelizmente essa página não foi encontrada."
      ]
    });
  });

  app.use(function (error, req, res, next) {
    res.status(500);
    res.render('index/erro', {
      numero: "500",
      mensagens: [
        "Erro no sistema.",
        "Infelizmente tivemos um erro no sistema, contate os desenvolvedores."
      ]
    });
  });
}

var config = require('./config.json');
var local = process.argv[2]=='4001' ? 'local' : 'servidor';
//var nomeporta = config[local].nomeporta;
//var porta = process.env[nomeporta] || process.argv[2];
var porta = config[local].nomeporta || process.argv[2];
app.listen(porta, function (req,res) {
    console.log('Servidor ativo na porta - '+porta);
});
