import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {Table, Button} from 'react-bootstrap';
import {FaPlusCircle, FaUserPlus, FaAddressCard} from 'react-icons/fa';
import './index.css';
import api from '../../services/api';

import JanelaProduto from '../../Components/Produto/JanelaProduto';
import JanelaVendedor from '../../Components/Vendedor/JanelaVendedor';
import JanelaCliente from '../../Components/Cliente/JanelaCliente';
import ModalQuantidade from '../../Components/ModalLancarValor';
import ModalDesconto from '../../Components/ModalLancarValor';
import VendaController from '../../Classes/VendaController';

export default () =>{

    const [showProdutos, setShowProdutos]     = useState(false);
    const [showVendedores, setShowVendedores] = useState(false);
    const [showClientes,setShowClientes]      = useState(false);
    const [showLancarQtde, setShowLancarQtde] = useState(false);
    const [showLancarDec, setShowLancarDec]   = useState(false);
    const [tabela, setTabela]                 = useState(false);
    const [total_bruto, setTotalBruto]        = useState(0);
    const [total_desconto, setTotalDesconto]  = useState(0);
    const [total_liquido, setTotalLiquido]    = useState(0);
    const [ItemId, setItemId]                 = useState(0);
    const [vendedor, setVendedor]             = useState();
    const [cliente, setCliente]               = useState();

    const [venda]                             = useState(new VendaController(alterarQuantidade, alterarDesconto));

    const history                             = useHistory()

    function renderTabela(){
        setTabela(venda.getLinhas());
        setTotalBruto(venda.CalcularTotalBruto());
        setTotalDesconto(venda.CalcularDesconto())
        setTotalLiquido(venda.CalcularTotalLiquido());
        setVendedor(venda.getVendedor().nome);
        setCliente(venda.getCliente().nome)
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

    function adicionarVendedor(data) {
        setShowVendedores(false);
        venda.AddVendedor(data);

        renderTabela();
    }

    function adicionarCliente(data) {
        setShowClientes(false);
        venda.AddCliente(data);

        renderTabela();
    }

    function limparTabela(e){
        window.location.reload();
    }

    async function handleSalvar(e) {

        if (venda.xItems.length <= 0) return;

        const data = new Date();
        venda.setDataOperacao(`${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`);

        try{
            const response = await api.post('orcamento', venda , { headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token')
            }})

            history.push(`relatorio-venda/${response.data.idVenda}`)
        }catch(err){
            localStorage.clear();
            alert(err);
        }
    }

    return (
        <div>
            <JanelaProduto 
                show={showProdutos}
                onHide={() => setShowProdutos(false)}
                selecionarRegistro={adicionarRegistro}
            />
            <JanelaVendedor 
                show={showVendedores}
                onHide={() => setShowVendedores(false)}
                selecionarRegistro={adicionarVendedor}
            />
            <JanelaCliente
                show={showClientes}
                onHide={() => setShowClientes(false)}
                selecionarRegistro={adicionarCliente}
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
                            <div className="col-md-1" id="home_logo" style={{display: "pointer"}}>
                                <h1><img src={logo} height="80px" width="80px" alt="logo"/></h1>
                            </div>
                            <div className="col-md-2" id="home_logo" style={{display: "pointer"}}>
                                <span className="display-4">Orçamento</span>
                            </div>
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
                                        <Button
                                            className="ml-2"
                                            variant={"outline-primary"} 
                                            title="Clique aqui para adicionar um vendedor"
                                            onClick={() => setShowVendedores(true)}
                                        > 
                                            <FaUserPlus size={30}/>
                                        </Button>
                                        <Button
                                            className="ml-2"
                                            variant={"outline-primary"} 
                                            title="Clique aqui para adicionar um cliente"
                                            onClick={() => setShowClientes(true)}
                                        > 
                                            <FaAddressCard size={30}/>
                                        </Button>
                                    </div>
                                </div>

                                <div style={{overflowY: 'auto', maxHeight: '400px'}}>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                                <th>Códido</th>
                                                <th>Descrição</th>
                                                <th>Preço</th>
                                                <th>Quantidade</th>
                                                <th>Desconto (%)</th>
                                                <th>SubTotal</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="mt-2">
                                            {tabela}
                                        </tbody>
                                    </Table> 
                                </div>
                                <div id="quadro_totais" className="mt-4">
                                    <div className="row border">
                                        <div className="col-12">
                                            <table> 
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="3"> <strong>Valor do Total Bruto: </strong>  </td>
                                                        <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(total_bruto)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3"> <strong>Valor Total de Desconto: </strong> </td>
                                                        <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(total_desconto)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3"> <strong>Valor Total Líquido: </strong> </td>
                                                        <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(total_liquido)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3"> <strong>Vendedor: </strong> </td>
                                                        <td>{vendedor}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="3"> <strong>Cliente: </strong> </td>
                                                        <td>{cliente}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="botoes" className="mt-2 mb-2" width="100%">
                                    <div className="row">
                                        <div className="col-12">
                                            <Button className="btn-danger" onClick={limparTabela}>Limpar</Button>
                                            <Button 
                                                className="btn-success ml-2"
                                                onClick={handleSalvar}
                                            >Confirmar</Button>
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