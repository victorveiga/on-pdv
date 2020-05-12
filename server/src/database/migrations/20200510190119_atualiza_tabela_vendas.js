const {VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.integer('formaPagamento');
    })
};

exports.down = function(knex) {
    return knex.schema.table(VENDA, function (table) {
        table.dropColumn('formaPagamento');
    })
};
