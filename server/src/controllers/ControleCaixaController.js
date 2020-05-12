const {CONTROLE_CAIXA,USUARIOS}  = require('../database/db_constantes');
const banco             = require('../database/connection');

class ControleCaixaController {

    async _getUsuario(id){
        const resultado = await banco(USUARIOS).select('id','nome').where('id', id);

        if (resultado)
            if (resultado[0])
                return resultado[0]
            else
                return resultado;    
    }

    async _getCaixaAberto(){
        const resultado = await banco(CONTROLE_CAIXA)
                                .select({idUsuario: `${USUARIOS}.id`})
                                .select([`${CONTROLE_CAIXA}.id`,`${USUARIOS}.nome`, `${CONTROLE_CAIXA}.abertura`])
                                .leftJoin(USUARIOS, `${USUARIOS}.id`, `${CONTROLE_CAIXA}.idUsuario`)
                                .where('fechamento', null)
                                .orderBy('id', 'desc').limit(1);   
        if (resultado)
            if (resultado[0])
                return resultado[0]
            else
                return resultado;                         

        return {};
    }

    async abertura(req,res){

        const {idUsuario} = req.body;
        const data = new Date();
        const dataString = `${data.getUTCFullYear()}-${("00" + (data.getUTCMonth()+1)).slice(-2)}-${data.getUTCDate()}`;

        const dados = {
            idUsuario,
            abertura: dataString
        }

        let [id] = await banco(CONTROLE_CAIXA).select('id').where('idUsuario', idUsuario).andWhere('abertura', dataString).andWhere('fechamento', null);
        
        // Se já tenho um caixa aberto, retorno ele
        if (id) {
            return res.status(200).json({idCaixa: id.id, usuario: await this._getUsuario(idUsuario)});
        }    

        // Abro o caixa e retorno as informações
        const resultado = await banco(CONTROLE_CAIXA).insert(dados).returning('id'); 
        let idCaixa = null

        if (resultado)
            if (resultado[0])
                idCaixa = resultado[0]
            else
                idCaixa = resultado;    
        
        return res.status(200).json( {idCaixa, usuario: await this._getUsuario(idUsuario)} );
    }

    // retorna caixa aberto
    async verificar(req,res){                                                 
        return res.status(200).json(await this._getCaixaAberto());        
    }

    async fechamento(req,res){
        const {id} = await this._getCaixaAberto();

        if (!id){
            return res.status(200).send('sem caixa aberto.');
        }

        await banco(CONTROLE_CAIXA).update({fechamento: new Date()}).where('id', id);
        return res.status(200).send('fechado');
    }

}

module.exports = new ControleCaixaController();