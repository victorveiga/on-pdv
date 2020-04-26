const {PROPRIETARIO} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(PROPRIETARIO, function(table){
        table.increments();
        table.string('nome');
        table.string('email');
        table.string('nomeUsuario');
        table.string('senha');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(PROPRIETARIO);
};
