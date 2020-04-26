import ItemVenda from './ItemVenda';

class Venda {

    constructor(){
        this.dataOperacao = 0;
        this.numero       = 0;
        this.serie        = 0;
        this.xItems       = [];
    }

    setDataOperacao(dataOperacao){ this.dataOperacao = dataOperacao }
    setNumero(numero){ this.numero = numero}
    setSerie(serie) { this.serie = serie }
    getDataOperacao(){ return this.dataOperacao }
    getNumero(){ return this.numero }
    getSerie(){ return this.serie }

    AddItem(data){
        this.xItems.push(new ItemVenda(data.id, data.codigoBarras, data.nome, 1, data.preco));
    }

    CalcularTotalBruto(){
        let total = 0;
        this.xItems.map(item => (
            total += item.getTotalItem()
        ))

        return total;
    }

    CalcularDesconto(){
        let total = 0;
        this.xItems.map(item => (
            total += item.getDesconto() > 0 ? (item.getTotalItem() * (item.getDesconto() / 100)) : 0
        ))

        return total;
    }

    CalcularTotalLiquido(){
        return this.CalcularTotalBruto() - this.CalcularDesconto();
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