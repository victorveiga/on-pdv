const {CONTROLE_CAIXA} = require('../db_constantes'); 

exports.up = function(knex) {
    return knex.schema.createTable(CONTROLE_CAIXA, function (table) {
        table.increments();
        table.integer('idUsuario');
        table.date('abertura');
        table.date('fechamento');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(CONTROLE_CAIXA); 
};
