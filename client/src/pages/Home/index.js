import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import '../../global.css';
import logo from '../../assets/logo.png';
import {useHistory} from 'react-router-dom';
import {FaSignOutAlt} from 'react-icons/fa';
import {AiFillSetting} from 'react-icons/ai';

// Janelas
import JanelaProduto from '../../Components/Produto/JanelaProduto';
import JanelaUsuario from '../../Components/Usuario/JanelaUsuario';
import Cliente from '../../Components/Cliente/JanelaCliente';
import Fornecedor  from '../../Components/Fornecedor/JanelaFornecedor';
import Vendedor from '../../Components/Vendedor/JanelaVendedor';

export default () => {
    const [nome, setNome] = useState();
    const history = useHistory();

    // estados
    const [produtoModalShow, setProdutoModalShow]       = useState(false);
    const [usuarioModalShow, setUsuarioModalShow]       = useState(false);
    const [clienteModalShow, setClienteModalShow]       = useState(false);
    const [fornecedorModalShow, setFornecedorModalShow] = useState(false);
    const [vendedorModalShow, setVendedorModalShow]     = useState(false);
    

    useEffect(()=>{
        const nome_usuario = localStorage.getItem('on-pdv-user-nome')
        setNome(nome_usuario);
    }, []);

    async function handleLogout(e){
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            {/** Janela Usuario */}
            <JanelaUsuario
                show={usuarioModalShow}
                onHide={() => setUsuarioModalShow(false)}
            />
            {/* Janela Produto */}
            <JanelaProduto 
                show={produtoModalShow}
                onHide={() => setProdutoModalShow(false)}
            />
            
            {/* Janela Cliente */}
            <Cliente
                show={clienteModalShow}
                onHide={() => setClienteModalShow(false)}
            />

            {/* Janela Fornecedor */}
            <Fornecedor
                show={fornecedorModalShow}
                onHide={() => setFornecedorModalShow(false)}
            />

            {/* Janela Vendedor */}
            <Vendedor
                show={vendedorModalShow}
                onHide={() => setVendedorModalShow(false)}
            />

            <div className="container" id="home_principal">
                <div row="row">
                    <div className="botoes">

                        <div className="row">
                            <div className="col-md-12" id="home_logo">
                                <h1><img src={logo} height="80px" width="80px" alt="logo"/></h1>
                                <span className="lead">ON-PDV</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12" id="home_welcome">                            
                                <h5>Bem vindo {nome}!</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col px-md-3 p-3 myBotao corCadastro" onClick={() => setUsuarioModalShow(true)}>
                                <h4 className="textoSemSelecao">Cadastro de Usuários</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corCadastro" onClick={() => setVendedorModalShow(true)}>
                                <h4 className="textoSemSelecao">Cadastro de Vendedores</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corCadastro" onClick={() => setClienteModalShow(true)}>
                                <h4 className="textoSemSelecao">Cadastro de Clientes</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corCadastro" onClick={() => setFornecedorModalShow(true)}>
                                <h4 className="textoSemSelecao">Cadastro de Fornecedores</h4>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col px-md-3 p-3 myBotao corCadastro" onClick={() => setProdutoModalShow(true)}>
                                <h4 className="textoSemSelecao">Cadastro de Produtos</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corModulo">
                                <h4 className="textoSemSelecao">Cadastro de Produtos em Falta</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corModulo">
                                <h4 className="textoSemSelecao" onClick={() => history.push('/orcamento')}>Terminal de Orçamentos</h4>
                            </div>
                            <div className="col px-md-3 p-3 myBotao corModulo">
                                <h4 className="textoSemSelecao">Terminal de Vendas</h4>
                            </div>
                        </div>

                        <div className="row mt-3" id="home_botoes_rodape">
                            <div>
                                <div className="home_botao_rodape"><AiFillSetting size={50} /></div>
                                <div className="home_botao_rodape" onClick={handleLogout}><FaSignOutAlt size={50}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}