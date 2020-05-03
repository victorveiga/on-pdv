const banco = require('../database/connection');

class ResultadoController {

    validaData(data){
        let patternData = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;
        if(!patternData.test(data)){
            return false;
        }

        return true
    }

    async ComissaoPorVendedor(req,res){

        const {inicio,fim} = req.query;

        if ((!this.validaData(inicio)) || (!this.validaData(fim))) return res.status(401).send('invalid date');

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