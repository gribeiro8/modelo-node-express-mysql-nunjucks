var moment = require('moment');
var dateToEua = function (dataa) {
  dataa = dataa.toString();
  datanova = dataa.split("/");
  datanova = datanova[2] + '-' + datanova[1] + '-' + datanova[0]
  return (datanova);
};

var dateToBR = function (dataa) {
  dataa = dataa.toString();
  datanova = dataa.split("-");
  datanova = datanova[2] + '/' + datanova[1] + '/' + datanova[2]
  return (datanova);
};

var diferencaHoras = function (start, end) {
  var duracao = moment.duration(end.diff(start));
  duracao = Math.floor(duracao.asHours()) + ':' + Math.floor(duracao.minutes());
  return duracao;
};

var extraouatraso = function (fez, carga) {
  fez = ConvertToSeconds(fez);
  carga = ConvertToSeconds(carga);
    //console.log(">>> Fez:"+fez);
    //console.log(">>> Carga:"+carga);
    if(fez>=carga){
      return true;
    }else{
      return false;
    }
}

var testaferiado = async function (dia) {
  const feriadoModel = require('../models/feriadosModel')()
  var feriado = await feriadoModel['selectFeriadobyData'](dia);
  if(feriado.length > 0 ){
    return true;
  }else{
    return false;
  }

}

var opTimes = function (startTime, endTime, operacao) {
  //console.log("Op times: "+ startTime+ " === "+ endTime+ "==="+operacao);
  var diff = 0;
  if (startTime && endTime) {
    startTime = ConvertToSeconds(startTime);
    endTime = ConvertToSeconds(endTime);
    if (operacao == "+") {
      diff = Math.abs(endTime + startTime);
    } else if (operacao == "-") {
      diff = Math.abs(endTime - startTime);
    }
    //console.log('>>> Time difference is : ' + secondsTohhmmss(diff));
    return secondsTohhmmss(diff);
  }


  function secondsTohhmmss(secs) {
    var hours = parseInt(secs / 3600);
    var seconds = parseInt(secs % 3600);
    var minutes = parseInt(seconds / 60);
    return hours + ":" + minutes;
  }
}

function ConvertToSeconds(time) {
  time = time.toString();
  var splitTime = time.split(":");
  return splitTime[0] * 3600 + splitTime[1] * 60;
}

module.exports.dateToEua = dateToEua;
module.exports.dateToBR = dateToBR;
module.exports.opTimes = opTimes;
module.exports.diferencaHoras = diferencaHoras;
module.exports.extraouatraso = extraouatraso;
module.exports.testaferiado = testaferiado;