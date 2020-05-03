const {VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.integer('idVendedor');
        table.integer('idCliente');
    })
};

exports.down = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.dropColumn('idVendedor');
        table.dropColumn('idCliente');
    })
};
