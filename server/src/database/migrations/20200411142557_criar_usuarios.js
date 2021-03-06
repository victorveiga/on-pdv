const {USUARIOS} = require('../db_constantes');

exports.up = function(knex) {

    return knex.schema.createTable(USUARIOS, function(table){
        table.increments();
        table.string('nome');
        table.string('sexo',1);
        table.string('end_logradouro');
        table.integer('end_numero');
        table.string('end_complemento');
        table.string('end_cep');
        table.string('end_bairro');
        table.string('end_cidade');
        table.string('end_uf',2);
        table.string('end_telefone');
        table.string('email');

        table.string('cpf',11);

        table.string('nomeUsuario');
        table.string('senha');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable(USUARIOS);
};
