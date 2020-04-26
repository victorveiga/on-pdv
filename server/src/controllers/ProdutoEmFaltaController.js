const {PRODUTOS_EM_FALTA} = require('../database/db_constantes');
const Controller = require('./Controller');

class ProdutoEmFaltaController extends Controller {

    constructor(){
        super(PRODUTOS_EM_FALTA)
    }

    store(req, res){
        return super.store(req,res, ['nome', 'nomeCliente', 'nomeVendedor']);
    }
    
    create(req, res){
        return super.create(req,res);
    }

    read(req, res){
        return super.read(req,res);
    }

    update(req, res){
        return super.update(req,res);
    }

    delete(req, res){
        return super.delete(req,res);
    }
}

module.exports = new ProdutoEmFaltaController();