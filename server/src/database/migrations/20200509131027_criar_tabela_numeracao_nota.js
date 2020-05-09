const {NUMERACAO} = require('../db_constantes'); 

exports.up = function(knex) {
    return knex.schema.createTable(NUMERACAO, function (table) {
        table.increments();
        table.string('emitido',1);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(NUMERACAO); 
};
