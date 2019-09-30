var fomatarDinheiro = function(n,c,d,t) {
   var c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

var removerRs = function (valor) {
   valor = valor.split(' ')[1];
   valor = valor.replace(',','.');
   return parseFloat(valor);
};

var convertervirgula = function (valor) {
   valor = valor.toString();
   return valor.replace(',','.');
};

var converterponto = function (valor) {
   valor = valor.toString();
   return valor.replace('.',',');
};

var converterpontovirgula = function (valor) {
   valor = valor.toString();
   valor =  valor.replace('.','#');
   valor =  valor.replace(',','.');
   valor =  valor.replace('#',',');
   return valor;
};


module.exports.fomatarDinheiro = fomatarDinheiro;
module.exports.removerRs = removerRs;
module.exports.convertervirgula = convertervirgula;
module.exports.converterponto = converterponto;
module.exports.converterpontovirgula = converterpontovirgula;