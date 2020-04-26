export default class ItemVenda {

    constructor(id=0, codigoBarras='', nome='', quantidade=0, preco=0, desconto=0){

        this.identificador = Math.ceil(Math.random() * 1000000);
        this.id            = id;
        this.codigoBarras  = codigoBarras;
        this.nome          = nome;
        this.preco         = preco;
        this.desconto      = desconto;
        this.quantidade    = quantidade;
    }

    setId(id){ this.id = id }
    setcodigoBarras(codigoBarras){ this.codigoBarras = codigoBarras; }
    setNome(nome){ this.nome = nome; }
    setQuantidade(quantidade){ this.quantidade = quantidade; }
    setPreco(preco){ this.preco = preco; }
    setDesconto(desconto){ this.desconto = desconto; }

    getIdentificador(){ return this.identificador }
    getId(){ return this.id }
    getCodigoBarras(){ return this.codigoBarras }
    getNome() { return this.nome }
    getQuantidade(){ return this.quantidade }
    getPreco(){ return this.preco }
    getDesconto(){ return this.desconto }
    
    getTotalItem(){ 
        let valor = this.getPreco() * this.getQuantidade();
        if (this.getDesconto() > 0)
            valor -= (valor * (this.getDesconto() / 100));
        return valor;
    }
    
}