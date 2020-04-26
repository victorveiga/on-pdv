const {VENDA_ITEM, VENDA} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(VENDA_ITEM, function(table){
        table.increments();
        table.integer('idProduto');
        table.decimal('preco');
        table.decimal('desconto');
        table.decimal('quantidade');
        table.integer('idVenda');
        table.foreign('idVenda').references('id').inTable(VENDA);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(VENDA_ITEM);
};
