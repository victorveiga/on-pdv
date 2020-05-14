const banco           = require('../database/connection');
const {CONTA_RECEBER} = require('../database/db_constantes');

class ContasReceberController {

    async _carregarDuplicatas(parametro) {

        const {rows} = await banco.raw(`
            select
                *
            from contas_receber
            where contas_receber."idVenda" = ?
            order by id  
        `, parametro )       
        
        return rows
    }

    async store(req,res){   
        
        const vendas = await banco.raw(`
            select 
                cr."idVenda" as venda,
                cl."nome" as nomeCliente,
                cr."total_numero_parcela"
            from contas_receber cr
            left join clientes cl on (cl."id" = cr."idCliente")
            GROUP BY 1, 2, 3
        `);

        // O código abaixo é para iterar sobre as vendas retornando suas respectivas duplicatas
        const anAsyncFunction = async item => {
            return Promise.resolve(item.duplicatas = await this._carregarDuplicatas([item.venda]))
        }

        const getVendas = async () => {
            return Promise.all(vendas.rows.map(item => anAsyncFunction(item)))
        }

        getVendas().then(data => {
            return res.status(200).json(vendas.rows);
        })

    }

    async lancarTitulos(dados, idVenda, nomeCliente){
        const numero_parcelas = dados.parcelas;
           
        const data = new Date(dados.dataOperacao);
            
        for (let i = 1; i <= numero_parcelas; i++){
            let objeto = {
                lancamento: dados.dataOperacao,
                idVenda,
                descricao: `DUPLICATA ${i}/${numero_parcelas} - 
                            R$: ${dados.totalLiquido / numero_parcelas} - 
                            CLIENTE: ${nomeCliente} - 
                            VENCIMENTO: ${data.getUTCDate()}/${("00" + (data.getUTCMonth()+1)).slice(-2)}/${data.getUTCFullYear()} - 
                            Total da nota: ${dados.totalLiquido}`,
                vencimento: `${data.getUTCFullYear()}-${data.getUTCMonth() +1 + i}-${data.getUTCDate()}`,
                parcela: i,
                total_numero_parcela: numero_parcelas,
                valor: (dados.totalLiquido / numero_parcelas),
                situacao: 'A', // A - de aberto
                idCliente: dados.idCliente
            }

            await banco(CONTA_RECEBER).insert(objeto);
        }
    }

    async atualizarTitulo(req,res){
        const {id, pagamento, valor_pago} = req.body;
        await banco(CONTA_RECEBER).update({pagamento, valor_pago}).where('id', id);
        return res.status(200).send('ok');
    }

}

module.exports = new ContasReceberController();