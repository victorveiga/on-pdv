const {CONTA_RECEBER} = require('../db_constantes'); 

exports.up = function(knex) {
    return knex.schema.createTable(CONTA_RECEBER, function (table) {
        table.increments();
        table.date('lancamento');
        table.integer('idVenda');
        table.string('descricao')
        table.date('vencimento');
        table.integer('parcela');
        table.integer('total_numero_parcela');
        table.decimal('valor');
        table.string('situacao',1);
        table.date('pagamento');
        table.decimal('valor_pago');
        table.integer('idCliente');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable(CONTA_RECEBER); 
};
