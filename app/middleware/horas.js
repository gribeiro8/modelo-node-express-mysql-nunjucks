var moment = require('moment');

function duasCasas(hora) {
  if(hora.toString().split("").length==1){
    return("0"+hora);
  }else{
    return(hora);
  }
}

function converterParaSegundos(hora) {
  hora = hora.toString();
  var dividirHora = hora.split(":");
  return dividirHora[0] * 3600 + dividirHora[1] * 60;
}

function segundasParaHoraFormatada(segundos) {
  var horas = parseInt(segundos / 3600);
  var segundos = parseInt(segundos % 3600);
  var minutos = parseInt(segundos / 60);
  return duasCasas(horas) + ":" + duasCasas(minutos);
}

var operacaoEntreHoras = function (horaInicial, horaFinal, operacao) {
  var diferenca = 0;
  if (horaInicial && horaFinal) {
    horaInicial = converterParaSegundos(horaInicial);
    horaFinal = converterParaSegundos(horaFinal);
    if (operacao == "+") {
      diferenca = Math.abs(horaFinal + horaInicial);
    } else if (operacao == "-") {
      diferenca = Math.abs(horaFinal - horaInicial);
    }
    return segundasParaHoraFormatada(diferenca);
  }
};

module.exports.duasCasas = duasCasas;
module.exports.operacaoEntreHoras = operacaoEntreHoras;