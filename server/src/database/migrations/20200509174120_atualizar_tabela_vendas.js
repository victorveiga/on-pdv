const {VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.integer('idUsuario');
    })
};

exports.down = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.dropColumn('idUsuario');
    })
};