module.exports = function () {
   var util = require('util');
   const pool = require('../db/dbPool')
   const tabela = "usuarios";
   const nomesingular = "Usuario";
   const nomeplural = "Usuarios";

   this['select'+nomeplural] = () => {
       let sql = 'select * from '+tabela+' ORDER BY nome ASC';
       return pool.query(sql);
   }


   this['autentica'+nomesingular] = (email,senha) => {
       let sql = 'select * from '+tabela+' where email = "' + email + '" AND password = "' + senha + '"';
       return pool.query(sql);
   }

   this['select'+nomesingular] = (id) => {
       let sql = 'select * from '+tabela+' where id = ' + id;
       return pool.query(sql);
   }

   this['adiciona'+nomesingular] = (params) => {
       let sql = 'insert into '+tabela+' set ? ';
       return pool.query(sql,params);
   }

   this['edita'+nomesingular] = (id,params) => {
       let sql = 'update '+tabela+' set ? where id = '+id;
       return pool.query(sql,params);
   }

   this['deleta'+nomesingular] = (id,params) => {
       let sql = 'delete from '+tabela+' where id = '+id;
       return pool.query(sql,params);
   }

   this['select' + nomeplural + 'Especial'] = (campos, inner, where) => {
       let sql = 'select ' + campos + ' from ' + tabela + ' as u ' + inner + where;
       return pool.query(sql);
   }

   this['select' + nomeplural + 'Sql'] = (sql) => {
     return pool.query(sql);
 }

   return this;
}