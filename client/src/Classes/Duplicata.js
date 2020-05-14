
class Duplicata {

    constructor(duplicata){
        this.id                   = duplicata.id;
        this.idVenda              = duplicata.idVenda;
        this.idCliente            = duplicata.idCliente;
        this.descricao            = duplicata.descricao;
        this.lancamento           = duplicata.lancamento;
        this.pagamento            = duplicata.pagamento;
        this.parcela              = duplicata.parcela;
        this.situacao             = duplicata.situacao;
        this.total_numero_parcela = duplicata.total_numero_parcela;
        this.valor                = duplicata.valor;
        this.valor_pago           = duplicata.valor_pago;
        this.vencimento           = duplicata.vencimento;
    }

}

export default Duplicata;