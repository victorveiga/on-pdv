const {FORNECEDORES} = require('../db_constantes');

exports.up = function(knex) {
    return knex.schema.table(FORNECEDORES, function (table) {
        table.string('cnpj', 15);
    })
};

exports.down = function(knex) {
    return knex.schema.table(FORNECEDORES, function (table) {
        table.dropColumn('cnpj');
    })
};
