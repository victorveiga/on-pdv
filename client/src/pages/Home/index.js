import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import logo from '../../assets/logo.png';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import {FaSignOutAlt} from 'react-icons/fa';
import {AiFillSetting} from 'react-icons/ai'

export default () => {
    const [nome, setNome] = useState();
    const history = useHistory();

    useEffect(()=>{
        const nome_usuario = localStorage.getItem('on-pdv-user-nome')
        setNome(nome_usuario);
    }, [localStorage.getItem('on-pdv-user-id')]);

    async function handleLogout(e){
        e.preventDefault();
        await api.get('/logout');
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="container" id="home_principal">
            <div row="row">
                <div className="botoes">

                    <div className="row">
                        <div className="col-md-12" id="home_logo">
                            <h1><img src={logo} height="80px" width="80px"/></h1>
                            <span className="lead">ON-PDV</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12" id="home_welcome">                            
                            <h5>Bem vindo {nome}!</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col px-md-3 p-3 myBotao corCadastro">
                            <h4 className="texto">Cadastro de Usuários</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corCadastro">
                            <h4 className="texto">Cadastro de Vendedores</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corCadastro">
                            <h4 className="texto">Cadastro de Clientes</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corCadastro">
                            <h4 className="texto">Cadastro de Fornecedores</h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col px-md-3 p-3 myBotao corCadastro">
                            <h4 className="texto">Cadastro de Produtos</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corModulo">
                            <h4 className="texto">Cadastro de Produtos em Falta</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corModulo">
                            <h4 className="texto">Terminal de Orçamentos</h4>
                        </div>
                        <div className="col px-md-3 p-3 myBotao corModulo">
                            <h4 className="texto">Terminal de Vendas</h4>
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
    );
}