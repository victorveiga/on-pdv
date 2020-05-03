import ItemVenda from './ItemVenda';

class Venda {

    constructor(){
        this.dataOperacao  = 0;
        this.numero        = 0;
        this.serie         = 0;
        this.totalBruto    = 0;
        this.totalDesconto = 0;
        this.totalLiquido  = 0;
        this.xItems        = [];
        this.vendedor      = {
            id: 0,
            nome: ''
        }

        this.cliente      = {
            id: 0,
            nome: ''
        }
    }

    setDataOperacao(dataOperacao){ this.dataOperacao = dataOperacao }
    setNumero(numero){ this.numero = numero}
    setSerie(serie) { this.serie = serie }
    getDataOperacao(){ return this.dataOperacao }
    getNumero(){ return this.numero }
    getSerie(){ return this.serie }

    AddItem(data){
        this.xItems.push(new ItemVenda(data.id, data.codigoBarras, data.nome, 1, data.preco, 0, data.descontoMaximo));
    }

    AddVendedor(data){
        this.vendedor.id   = data.id;
        this.vendedor.nome = data.nome;
    }

    AddCliente(data){
        this.cliente.id   = data.id;
        this.cliente.nome = data.nome;
    }
    
    getVendedor(){
        return this.vendedor;
    }

    getCliente(){
        return this.cliente;
    }

    CalcularTotalBruto(){
        let total = 0;
        this.xItems.map(item => (
            total += item.getTotalItem()
        ))

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