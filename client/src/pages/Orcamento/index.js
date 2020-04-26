import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Table, Button} from 'react-bootstrap';
import {FaPlusCircle} from 'react-icons/fa';
import './index.css';

import JanelaProduto from '../../Components/Produto/JanelaProduto';
import ModalQuantidade from '../../Components/ModalLancarValor';
import ModalDesconto from '../../Components/ModalLancarValor';
import VendaController from '../../Classes/VendaController';

export default () =>{

    const [showProdutos, setShowProdutos]     = useState(false);
    const [showLancarQtde, setShowLancarQtde] = useState(false);
    const [showLancarDec, setShowLancarDec]   = useState(false);
    const [tabela, setTabela]                 = useState(false);
    const [total_bruto, setTotalBruto]        = useState(0);
    const [total_desconto, setTotalDesconto]  = useState(0);
    const [total_liquido, setTotalLiquido]    = useState(0);
    const [ItemId, setItemId]                 = useState(0);

    const [venda]                             = useState(new VendaController(alterarQuantidade, alterarDesconto));

    function renderTabela(){
        setTabela(venda.getLinhas());
        setTotalBruto(venda.CalcularTotalBruto());
        setTotalDesconto(venda.CalcularDesconto())
        setTotalLiquido(venda.CalcularTotalLiquido());
    }

    function alterarQuantidade(identificador) {
        setItemId(identificador);
        setShowLancarQtde(true);
    }

    function alterarDesconto(identificador) {
        setItemId(identificador);
        setShowLancarDec(true);
    }

    function setQuantidade(identificador, valor){
        setShowLancarQtde(false);
        venda.setQuantidadeItem(identificador, valor);
        renderTabela();
    }

    function setDesconto(identificador, valor){
        setShowLancarDec(false);
        venda.setDescontoItem(identificador, valor);
        renderTabela();
    }

    function adicionarRegistro(data) {
        setShowProdutos(false);
        venda.AddItem(data);

        renderTabela();
    }

    function limparTabela(e){
        window.location.reload();
    }

    return (
        <div>
            <JanelaProduto 
                show={showProdutos}
                onHide={() => setShowProdutos(false)}
                selecionarRegistro={adicionarRegistro}
            />
            <ModalQuantidade 
                show={showLancarQtde}
                onHide={setQuantidade}
                ItemId={ItemId}
            />
            <ModalDesconto
                show={showLancarDec}
                onHide={setDesconto}
                ItemId={ItemId}
            />
            <div className="container">

                <div id="orcamento_principal">

                    <div id="orcamento_principal_container">

                        <div className="row" id="orcamento_cabecalho">
                            <span className="display-4">Orçamentos</span>
                        </div>
                        
                        <div id="orcamento_conteudo">

                            <div className="col-md-12 mx-auto">

                                <div className="row mt-2 mb-2">
                                    <div id="botoes_operacao" className="col-md-12">
                                        <Button
                                            variant={"outline-primary"} 
                                            title="Clique aqui para adicionar um produto"
                                            onClick={() => setShowProdutos(true)}
                                        > 
                                            <FaPlusCircle size={30}/>
                                        </Button>
                                    </div>
                                </div>

                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Códido</th>
                                            <th>Descrição</th>
                                            <th>Preço</th>
                                            <th>Quantidade</th>
                                            <th>Desconto (%)</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="mt-2">
                                        {tabela}
                                    </tbody>
                                </Table> 
                                <div id="quadro_totais">
                                    <div className="row border">
                                        <div className="col-12">
                                            <div className=""><h3>Valor do Total Bruto: {total_bruto}</h3></div>
                                            <div className=""><h3>Valor Total de Desconto: {total_desconto}</h3></div>
                                            <div className=""><h3>Valor Total Líquido: {total_liquido}</h3></div>
                                        </div>
                                    </div>
                                </div>
                                <div id="botoes" className="mt-2 mb-2" width="100%">
                                    <div className="row">
                                        <div className="col-12">
                                            <Button className="btn-danger" onClick={limparTabela}>Limpar</Button>
                                            <Button className="btn-success ml-2">Confirmar</Button>
                                            <Link to="/">
                                                <Button className="btn-primary ml-2">Voltar</Button>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>
                                    
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>    
    );
}