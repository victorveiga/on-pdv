const {VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(VENDA, function(table){
        table.increments();
        table.datetime('dataOperacao', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.string('numero');
        table.string('serie');
        table.string('idVendedor');
        table.string('idCliente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(VENDA);
};
