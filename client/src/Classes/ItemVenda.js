export default class ItemVenda {

    constructor(id=0, codigoBarras='', nome='', quantidade=1, preco=0, desconto=0, descontoMaximo=0){

        this.identificador  = Math.ceil(Math.random() * 1000000);
        this.id             = id;
        this.codigoBarras   = codigoBarras;
        this.nome           = nome;
        this.preco          = preco;
        this.desconto       = desconto;
        this.quantidade     = quantidade;
        this.descontoMaximo = descontoMaximo;
    }

    setId(id){ this.id = id }
    setcodigoBarras(codigoBarras){ this.codigoBarras = codigoBarras; }
    setNome(nome){ this.nome = nome; }
    setQuantidade(quantidade){ this.quantidade = quantidade; }
    setPreco(preco){ this.preco = preco; }
    setDesconto(desconto){ 

        if ((this.getDescontoMaximo() > 0)&&(desconto > this.getDescontoMaximo()))
            this.desconto = this.getDescontoMaximo(); 
        else    
            this.desconto = desconto; 
    }

    getIdentificador(){ return this.identificador }
    getId(){ return this.id }
    getCodigoBarras(){ return this.codigoBarras }
    getNome() { return this.nome }
    getQuantidade(){ return this.quantidade }
    getPreco(){ return this.preco }
    getDesconto(){ return this.desconto }
    getDescontoMaximo(){ 
        if ((!this.descontoMaximo) || (this.descontoMaximo === null) || (this.descontoMaximo === '')){
            return 0
        }

        return this.descontoMaximo 
    }

    getSubTotalItem(){
        return this.getPreco() * this.getQuantidade();
    }
    
    getTotalItem(){ 
        let valor = this.getPreco() * this.getQuantidade();
        if (this.getDesconto() > 0)
            valor -= (valor * (this.getDesconto() / 100));
        return valor;
    }
    
}