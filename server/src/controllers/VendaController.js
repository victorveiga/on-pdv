const {VENDA, VENDA_ITEM, PRODUTOS, VENDEDORES, CLIENTES} = require('../database/db_constantes');
const Controller = require('../controllers/Controller');
const banco = require('../database/connection');

class OrcamentoController extends Controller {

    constructor(){
        super(VENDA)
    }

    store(req, res){
        return super.store(req,res, ['numero', 'numero', 'numero']);
    }

    async _createItens(data){
        return await banco(VENDA_ITEM).insert( data ).returning('id')
    }
    
    async create(req, res){
        const {xItems, vendedor, cliente, totalBruto, totalDesconto, totalLiquido} = req.body;
        let {dataOperacao, numero, serie} = req.body
        const idVendedor   = vendedor.id;
        const idCliente    = cliente.id;
        
        if (dataOperacao <= 0){
            dataOperacao = null;
        }

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
            totalLiquido}
        ).returning('id');

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

    update(req, res){
        return res.status(401).send('unauthorized');
        //return super.update(req,res);
    }

    delete(req, res){
        //return super.delete(req,res);
        return res.status(401).send('unauthorized');
    }
}

module.exports = new OrcamentoController();