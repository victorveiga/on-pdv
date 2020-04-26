const {PRODUTOS_EM_FALTA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(PRODUTOS_EM_FALTA, function (table) {
        table.string('nome');
        table.string('idCliente');
        table.string('nomeCliente');
        table.string('idVendedor');
        table.string('nomeVendedor');
    })
};

exports.down = function(knex) {
    return knex.schema.table(PRODUTOS_EM_FALTA, function (table) {
        table.dropColumn('nome');
        table.dropColumn('idCliente');
        table.dropColumn('nomeCliente');
        table.dropColumn('idVendedor');
        table.dropColumn('nomeVendedor');
    })
};
