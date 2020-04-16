import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import logo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default () => {

    const history                       = useHistory();
    const [nome, setNome]               = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail]             = useState('');
    const [senha, setSenha]             = useState('');

    async function handleRegistrar(e){
        e.preventDefault();
        const req = await api.post('/usuario', {nomeUsuario, nome, email, senha});

        if (req.data.id){
            history.push('/');
        }
    }

    return (
        <div className="container" id="register_principal">
            <div className="row" id="row_principal">
                <div className="col-md-12 mx-auto">
                    <div className="form">

                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1><img src={logo} alt="kanban board" height="80px" width="80px"/></h1>
                                <h1>Registre-se</h1>
                            </div>
                        </div>

                        <form onSubmit={handleRegistrar} method="post" name="register">
                            <div className="row">
                                <div className="col-md-5 mx-auto">
                                    <div className="form-group row">
                                        <label for="nomeUsuario">Nome de usuário</label>
                                        <input 
                                            type="text" 
                                            name="nomeUsuario"  
                                            className="form-control" 
                                            id="nomeUsuario" 
                                            placeholder="Informe um nome de usuário" 
                                            value={nomeUsuario}
                                            onChange={e => setNomeUsuario(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group row">
                                        <label for="senha">Senha</label>
                                        <input 
                                            type="password" 
                                            name="senha"  
                                            className="form-control" 
                                            id="senha" 
                                            placeholder="Informe uma senha para seu usuário" 
                                            value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                            required />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group row">
                                        <label for="nome">Nome completo</label>
                                        <input 
                                            type="text" 
                                            name="nome"  
                                            className="form-control" 
                                            id="nome" 
                                            placeholder="Informe seu nome completo" 
                                            value={nome}
                                            onChange={e => setNome(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group row">
                                        <label for="email">E-mail</label>
                                        <input 
                                            type="text" 
                                            name="email"  
                                            className="form-control" 
                                            id="email" 
                                            placeholder="Informe seu email" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mx-auto">
                                    <div className="col-md-5 mx-auto text-center ">
                                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Começar</button>
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="login-or">
                                            <hr className="hr-or"/>
                                            <span className="span-or"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">Já tem uma conta? <Link to="/" id="signin">Acesse aqui</Link></p>
                                    </div>
                                </div>
                            </div>
                        </form>    

                    </div>     
                        
                </div>
            </div>
        </div>
    );
}