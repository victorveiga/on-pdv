const {VENDA, VENDA_ITEM} = require('../database/db_constantes');
const Controller = require('../controllers/Controller');
const banco = require('../database/connection');

class OrcamentoController extends Controller {

    constructor(){
        super(VENDA)
    }

    store(req, res){
        return super.store(req,res, ['numero', 'idCliente', 'idVendedor']);
    }

    async _createItens(data){
        console.log(data)
        return await banco(VENDA_ITEM).insert( data ).returning('id')
    }
    
    async create(req, res){
        const {numero, serie, xItems, vendedor, cliente} = req.body;
        let {dataOperacao} = req.body
        const idVendedor   = vendedor.id;
        const idCliente    = cliente.id;

        if (dataOperacao <= 0){
            dataOperacao = null;
        }

        const [idVenda] = await banco(VENDA).insert({dataOperacao, numero, serie, idVendedor, idCliente}).returning('id');

        if (idVenda){

            xItems.map(item => (
                this._createItens({  idProduto: item.id, preco: item.preco, desconto: item.desconto, quantidade: item.quantidade, idVenda  })
            ))

            return res.status(200).json({idVenda});
        }
    }
/*
    read(req, res){
        return super.read(req,res);
    }

    update(req, res){
        return super.update(req,res);
    }

    delete(req, res){
        return super.delete(req,res);
    }*/
}

module.exports = new OrcamentoController();