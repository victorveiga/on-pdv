const banco = require('../database/connection');

class Controller {

    constructor(tabela){
        this.tabela = tabela
    }

    async store(req, res, colunas){

        const {page = 1} = req.query;
        const {search=''} = req.headers;
        
        const [count] = await banco(this.tabela)
                            .where(colunas[0], 'like', `%${search}%`)
                            .orWhere(colunas[1], 'like', `%${search}%`)
                            .orWhere(colunas[2], 'like', `%${search}%`)
                            .count();

        const resultado = await banco(this.tabela)
            .offset((page-1) * 5)
            .select('*')
            .where(colunas[0], 'like', `%${search}%`)
            .orWhere(colunas[1], 'like', `%${search}%`)
            .orWhere(colunas[2], 'like', `%${search}%`)
            .limit(5)
            .orderBy('id')
           
        let total = count['count']
        res.header('total', total)    
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