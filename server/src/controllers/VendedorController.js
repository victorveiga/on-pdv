const {VENDEDORES} = require('../database/db_constantes');
const Controller = require('./Controller');

class VendedorController extends Controller {

    constructor(){
        super(VENDEDORES)
    }

    store(req, res){
        return super.store(req,res);
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

module.exports = new VendedorController();