const {PRODUTOS_EM_FALTA, PRODUTOS} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.createTable(PRODUTOS_EM_FALTA, function(table){
        table.increments();
        table.date('dataFalta');
        table.date('dataChegada');

        table.integer('produto_id');
        //table.foreign('produto_id').references('id').inTable(PRODUTOS);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(PRODUTOS_EM_FALTA);
};