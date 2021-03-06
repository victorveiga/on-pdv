import ItemVenda from './ItemVenda';

class Venda {

    constructor(){
        this.id             = null;
        this.dataOperacao   = 0;
        this.numero         = 0;
        this.serie          = 0;
        this.totalBruto     = 0;
        this.totalDesconto  = 0;
        this.totalLiquido   = 0;
        this.formaPagamento = 0;
        this.parcelas       = 0;
        this.idCaixa        = 0;
        this.xItems         = [];

        this.vendedor       = {
            id: 0,
            nome: ''
        }

        this.cliente       = {
            id: 0,
            nome: ''
        }

        this.usuario       = {
            id: 0,
            nome: ''
        }
    }

    setId(id){ this.id = id}
    setDataOperacao(dataOperacao){ this.dataOperacao = dataOperacao }
    setNumero(numero){ this.numero = numero}
    setSerie(serie) { this.serie = serie }
    setFormaPagamento(forma){ this.formaPagamento = forma}
    setParcelas(parcelas){ this.parcelas = parcelas }
    setCaixa(caixa){ this.idCaixa = caixa }
    getId(){ return this.id }
    getDataOperacao(){ return this.dataOperacao }
    getNumero(){ return this.numero }
    getSerie(){ return this.serie }
    getFormaPagamento(){ return this.formaPagamento }
    getParcelas(){ return this.parcelas }
    getCaixa(){ return this.idCaixa }

    AddItem(data){
        this.xItems.push(new ItemVenda(data.id, data.codigoBarras, data.nome, data.quantidade, data.preco, data.desconto, data.descontoMaximo));
    }

    AddVendedor(data){
        this.vendedor.id   = data.id;
        this.vendedor.nome = data.nome;
    }

    AddCliente(data){
        this.cliente.id   = data.id;
        this.cliente.nome = data.nome;
    }

    AddUsuario(data){
        this.usuario.id = data.id;
        this.usuario.nome = data.nome;
    }
    
    getVendedor(){
        return this.vendedor;
    }

    getCliente(){
        return this.cliente;
    }

    getUsuario(){
        return this.usuario;
    }

    CalcularTotalBruto(){
        let total = 0;
        this.xItems.map(item => (
            total += item.getTotalItem()
        ))

        total += this.CalcularDesconto();  

        this.totalBruto = total;
        return total;
    }

    CalcularDesconto(){
        let total = 0;
        this.xItems.map(item => (
            total += item.getDesconto() > 0 ? (item.getSubTotalItem() * (item.getDesconto() / 100)) : 0
        ))

        this.totalDesconto = total;
        return total;
    }

    CalcularTotalLiquido(){
        this.totalLiquido = this.CalcularTotalBruto() - this.CalcularDesconto();
        return this.totalLiquido;
    }

    getItemByIdentificador(identificador) {
        let itemVenda = this.xItems.filter( (item) => { return item.identificador === identificador})
        if (itemVenda.length <= 0) return null;
        return itemVenda[0];
    }

    setDescontoItem(identificador, valor){
        this.getItemByIdentificador(identificador).setDesconto(valor);
    }

    setQuantidadeItem(identificador, valor){
        this.getItemByIdentificador(identificador).setQuantidade(valor);
    }
}

export default Venda;