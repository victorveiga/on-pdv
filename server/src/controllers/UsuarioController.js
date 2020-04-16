const {USUARIOS}  = require('../database/db_constantes');
const Controller  = require('./Controller');
const banco_local = require('../database/connection');

class UsuarioController extends Controller {

    constructor(){
        super(USUARIOS)
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

    async findByUsername(nome, cb){
        let record = await banco_local(USUARIOS).select().where('nomeUsuario', 'like', `%${nome}%`);
        record     = record[0]
        
        if (!record){ // Se não encontrar o registro
            return cb(null,null)
        }

        if (record.nomeUsuario != nome){
            return cb(null, null)
        }

        return cb(null, record)
    }

    async findById(id,cb){
        
        let record = await banco_local(USUARIOS).select().where('id', id);
        record     = record[0]

        if (!record){ // Se não encontrar o registro
            return cb(new Error('Usuario ' + id + ' não encontrado'))
        }

        if (record.id != id){

            return cb(new Error('Usuario ' + id + ' não encontrado'))
        }

        return cb(null, record)
    }
}

module.exports = new UsuarioController();