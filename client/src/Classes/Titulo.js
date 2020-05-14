import Duplicata from './Duplicata';

class Titulo {

    constructor(titulo){
        this.venda                = titulo.venda;
        this.nomecliente          = titulo.nomecliente;
        this.total_numero_parcela = titulo.total_numero_parcela;
        
        this.duplicatas           = [];

        titulo.duplicatas.map(duplicata => (
            this.addDuplicata(duplicata)
        ))
    }

    addDuplicata(duplicata){
        this.duplicatas.push(new Duplicata(duplicata));
    }

}

export default Titulo;