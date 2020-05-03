const {VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.decimal('totalBruto');
        table.decimal('totalDesconto');
        table.decimal('totalLiquido');
    })
};

exports.down = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.dropColumn('totalBruto');
        table.dropColumn('totalDesconto');
        table.dropColumn('totalLiquido');
    })
};