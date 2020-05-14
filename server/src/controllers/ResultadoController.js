const {EMPRESA} = require('../database/db_constantes');
const banco = require('../database/connection');

class ResultadoController {

    _validaData(data){
        let patternData = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
        if(!patternData.test(data)){
            return false;
        }

        return true
    }

    async _carregaVendas(parametros) {
    
        if (parametros.length <= 0) return

        const {rows} = await banco.raw(`
            SELECT
                CAST('DINHEIRO' AS VARCHAR(8)) AS formaPagamento,
                SUM(VENDAS."totalLiquido") as TOTAL
            FROM VENDAS
            WHERE VENDAS."idCaixa" = ?
            AND VENDAS."formaPagamento" = 1
            GROUP BY 1
            
            UNION ALL 
            
            SELECT
                CAST('A PRAZO' AS VARCHAR(8)) AS formaPagamento,
                SUM(CONTAS_RECEBER.VALOR) as total
            FROM CONTAS_RECEBER
            LEFT JOIN VENDAS ON (VENDAS."id" = CONTAS_RECEBER."idVenda")
            WHERE CONTAS_RECEBER."pagamento" >= ? AND CONTAS_RECEBER."pagamento" <= ?
            AND VENDAS."idCaixa" = ?
            AND VENDAS."formaPagamento" = 2
            GROUP BY 1   
        `, parametros )     
        
        return rows
    }

    async ConferenciaDeCaixa(req,res){

        const {inicio,fim} = req.query;

        if ((!this._validaData(inicio)) || (!this._validaData(fim))) return res.status(401).send('invalid date');

        const resultado_empresa = await banco(EMPRESA).select('*');      
        
        const result_caixa = await banco.raw(`
            SELECT 
                CONTROLE_CAIXA.*,
                usuarios."nome"
            FROM CONTROLE_CAIXA
            LEFT JOIN usuarios ON (usuarios."id" = CONTROLE_CAIXA."idUsuario")
            WHERE (
                    (CONTROLE_CAIXA."fechamento" >= ? AND CONTROLE_CAIXA."fechamento" <= ?)
                    OR
                    (CONTROLE_CAIXA."fechamento" = null)
            )
        `, [inicio, fim] );

        // O código abaixo é para iterar sobre os caixas no período retornando suas respectivas vendas
        const anAsyncFunction = async item => {
            return Promise.resolve(item.vendas = await this._carregaVendas([item.id, inicio, fim, item.id]))
        }

        const getVendas = async () => {
            return Promise.all(result_caixa.rows.map(item => anAsyncFunction(item)))
        }

        getVendas().then(data => {
            return res.status(200).json({empresa: resultado_empresa[0], caixa: result_caixa.rows});
        })

    }

    async ComissaoPorVendedor(req,res){

        const {inicio,fim} = req.query;

        if ((!this._validaData(inicio)) || (!this._validaData(fim))) return res.status(401).send('invalid date');

        const resultado_empresa = await banco.raw(`SELECT * FROM EMPRESA`);

        const resultado_vendedores = await banco.raw(`
            WITH DADOS AS (
                SELECT
                V.ID AS ID_VENDEDOR,
                V.NOME,
                V.COMISSAO
                FROM VENDEDORES V
                ORDER BY V.ID
            )	
            SELECT
                D.ID_VENDEDOR,
                D.NOME AS NOME_VENDEDOR,
                D.COMISSAO,
                SUM(VENDAS."totalLiquido") AS TOTAL_VENTIDO,
                COUNT(VENDAS.id) AS TOTAL_VENDAS,
                ROUND(SUM(VENDAS."totalLiquido") * (D.COMISSAO / 100), 2) AS TOTAL_COMISSAO
            FROM DADOS D  
            LEFT JOIN VENDAS on (VENDAS."idVendedor" = D.ID_VENDEDOR)
            WHERE VENDAS."dataOperacao" >= ? AND VENDAS."dataOperacao" <= ?
            AND COALESCE(VENDAS."numero_ofical", 0) > 0
            GROUP BY 1,2,3
        ORDER BY 2
        `, [inicio, fim]);

        let vendedores = [];
        let empresa    = null;
        if (resultado_vendedores) vendedores = resultado_vendedores.rows;
        if (resultado_empresa){
            if (resultado_empresa.rows[0]){
                empresa = resultado_empresa.rows[0];
            } else {
                empresa = resultado_empresa.rows;
            }
        }

        return res.status(200).json({empresa,vendedores});
    }

}

module.exports = new ResultadoController();