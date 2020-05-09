const {VENDA, VENDA_ITEM, PRODUTOS, VENDEDORES, CLIENTES, NUMERACAO} = require('../database/db_constantes');
const Controller = require('../controllers/Controller');
const banco = require('../database/connection');

class OrcamentoController extends Controller {

    constructor(vendaOficial = false){
        super(VENDA);
        this.vendaOficial = vendaOficial;
    }

    /** Funções privadas */
    async _createItens(data){
        if (!data.desconto) data.desconto = 0
        return await banco(VENDA_ITEM).insert( data ).returning('id')
    }

    async _getNumeroOficial(){
        const [id] = await banco(NUMERACAO).insert( {emitido: 'S'} ).returning('id');
        return id
    }

    /** Fim Funções privadas */

    async store(req, res){
        //return super.store(req,res, ['numero', 'numero', 'numero']);
        const {page = 1} = req.query;
        const {search=''} = req.headers;
        
        const [count] = await banco(VENDA)
                            .whereRaw(`coalesce(numero_ofical, 0) = 0`)
                            .andWhere('numero', 'like', `%${search}%`)
                            .count();  

        const resultado = await banco(VENDA)
            .offset((page-1) * 5)
            .select('*')
            .whereRaw(`coalesce(numero_ofical, 0) = 0`)
            .andWhere('numero', 'like', `%${search}%`)
            .limit(5)
            .orderBy('id')
           
        let total = count['count'] 
        res.header('total', total)    
        return res.status(200).json(resultado);
    }
    
    async create(req, res){

        const {xItems, vendedor, cliente, usuario, totalBruto, totalDesconto, totalLiquido} = req.body;
        let {dataOperacao, numero, serie, numero_ofical} = req.body
        const idVendedor   = vendedor.id;
        const idCliente    = cliente.id;
        const idUsuario    = usuario.id;
        
        if (dataOperacao <= 0){
            dataOperacao = null;
        }

        if (this.vendaOficial)
            numero_ofical = await this._getNumeroOficial();

        const resultado = await banco(VENDA).select( 'id' ).orderBy('id', 'desc').limit(1);
        if (resultado){
            let iNumero = -1;

            if (resultado.id){
                iNumero = resultado[0].id;
            } else {
                iNumero = resultado[0].id;
            }
            
            numero  = (iNumero+1);
            serie   = 1;
        }

        const [idVenda] = await banco(VENDA).insert({
            dataOperacao, 
            numero, 
            serie, 
            idVendedor, 
            idCliente, 
            totalBruto, 
            totalDesconto, 
            totalLiquido,
            numero_ofical,
            idUsuario
        }).returning('id');

        if (idVenda){

            xItems.map(item => (
                this._createItens({  idProduto: item.id, preco: item.preco, desconto: item.desconto, quantidade: item.quantidade, idVenda  })
            ))

            return res.status(200).json({idVenda});
        }
    }

    async read(req, res){
        const {id} = req.params;
        //const venda = await banco(VENDA).select([`${VENDA}.*`]).where(`${VENDA}.id`, '=',id);
        // direto
        const resultado = await banco.raw(` select 
                                             ${VENDA}.*,
                                             ${VENDEDORES}.nome as nome_vendedor,
                                             ${VENDEDORES}.end_telefone, 
                                             ${CLIENTES}.nome as nome_cliente,
                                             ${VENDEDORES}.cpf as cpf_cliente
                                             from ${VENDA}
                                             left join ${VENDEDORES} on (${VENDEDORES}."id" = ${VENDA}."idVendedor")
                                             left join ${CLIENTES} on (${CLIENTES}."id" = ${VENDA}."idCliente")
                                             where ${VENDA}."id" = ${id}
                                       `);

        const venda = resultado.rows;                               
        const itens = await banco(VENDA_ITEM).select('*').leftJoin(PRODUTOS, `${VENDA_ITEM}.idProduto`, `${PRODUTOS}.id`).where('idVenda', id);

        return res.status(200).json({venda, itens});
    }

    async update(req, res){

        const idVenda = req.params.id;

        const {xItems, vendedor, cliente, usuario, totalBruto, totalDesconto, totalLiquido} = req.body;
        let {dataOperacao, numero, serie, numero_ofical} = req.body
        const idVendedor   = vendedor.id;
        const idCliente    = cliente.id;
        const idUsuario    = usuario.id;

        if (numero_ofical){
            return res.status(401).send('unauthorized');
        }

        if (this.vendaOficial)
            numero_ofical = await this._getNumeroOficial();
        
        if (dataOperacao <= 0){
            dataOperacao = null;
        }

        const dados = {
            dataOperacao, 
            numero, 
            serie, 
            idVendedor, 
            idCliente, 
            totalBruto, 
            totalDesconto, 
            totalLiquido,
            numero_ofical,
            idUsuario
        }

        await banco(VENDA).update(dados).where('id', idVenda);
        await banco(VENDA_ITEM).delete().where('idVenda', idVenda);

        xItems.map(item => (
            this._createItens({  idProduto: item.id, preco: item.preco, desconto: item.desconto, quantidade: item.quantidade, idVenda  })
        ))

        return res.status(200).json({idVenda});
    }

    delete(req, res){
        //return super.delete(req,res);
        return res.status(401).send('unauthorized');
    }
}

module.exports = OrcamentoController;