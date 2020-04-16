const banco = require('../database/connection');

class Controller {

    constructor(tabela){
        this.tabela = tabela
    }

    async store(req, res){

        const {page = 1} = req.query;
        const [count] = await banco(this.tabela).count();
        const resultado = await banco(this.tabela)
            .offset((page-1) * 5)
            .select('*')
            .limit(5)
            .orderBy('id')
           
        let total = count['count']
        res.header('X-Total-Count', total)    
        return res.status(200).json(resultado);
    }
    
    async create(req, res){
        const [id] = await banco(this.tabela).insert(req.body).returning('id');
        return res.status(200).json({id});
    }

    async read(req, res){
        const {id} = req.params;
        const resultado = await banco(this.tabela).select('*').where('id', id).orderBy('id')
        return res.status(200).json(resultado)
    }

    async update(req, res){
        const {id} = req.params;
        const resultado = await banco(this.tabela).where('id', id).update(req.body)
        return res.status(200).json(resultado)
    }

    async delete(req, res){
        const {id} = req.params;
        const resultado = await banco(this.tabela).where('id', id).delete()
        return res.status(200).json(resultado)
    }
}

module.exports = Controller; 