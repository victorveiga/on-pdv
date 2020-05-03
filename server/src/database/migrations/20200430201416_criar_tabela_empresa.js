const {EMPRESA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(EMPRESA, function (table) {
        table.increments();
        table.string('nome');
        table.string('nome_fantasia');        
        table.string('inscricao');
        table.string('insricaoEstadual');
        table.string('end_telefone');
        table.string('email');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(EMPRESA);
};
