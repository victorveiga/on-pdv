const {PRODUTOS} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(PRODUTOS, function(table){
        table.increments();
        table.string('codigoBarras');
        table.string('codigoReferencia');
        table.string('nome');
        table.decimal('preco');
        table.decimal('descontoMaximo');
        table.string('ncm');
        table.string('cest');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(PRODUTOS);
};