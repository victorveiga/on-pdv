const {CLIENTES} = require('../database/db_constantes');
const Controller = require('./Controller');

class ClienteController extends Controller {

    constructor(){
        super(CLIENTES)
    }

    store(req, res){
        return super.store(req,res, ['nome', 'email', 'cpf']);
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

module.exports = new ClienteController();