import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import logo from '../../assets/logo.png';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default ()=>{

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('authenticate', {username, password});
        
            if ((!response.data.token) || (response.data.token === null) || (response.data.token === undefined)){
                alert('Usuário não encontrado, tente novamente.');
                return
            }

            localStorage.setItem('on-pdv-user-nome', response.data.nome);
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('on-pdv-user-nome-usuario', response.data.nomeUsuario);

            history.push('/');
        } catch (err) {
            localStorage.clear();
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="container" id="logon_principal">
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="form">

                        <div className="logo mb-3">
                            <div className="col-md-12 text-center">
                                <h1><img src={logo} alt="kanban board" height="80px" width="80px"/></h1>
                                <h1>Conecte-se</h1>
                            </div>
                        </div>

                        <form onSubmit={handleLogin} method="post" name="login">
                            <div className="form-group">
                            <label>Nome de usuário</label>
                                <input 
                                    type="text" 
                                    name="username"  
                                    className="form-control" 
                                    id="username" 
                                    placeholder="Entre com seu nome de usuário" 
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"  
                                    className="form-control"
                                    placeholder="Entre com sua senha" 
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-md-12 text-center ">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Entrar</button>
                            </div>
                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or"/>
                                    <span className="span-or"></span>
                                </div>
                            </div>
                            <div className="form-group">
                                <p className="text-center">Não tem conta? <Link to="/register" id="signup">Inscreva-se aqui</Link></p>
                                <div>
                                    <p style={{textAlign: 'center', marginTop: '0', paddingTop: 0}}>
                                        <a href="https://github.com/victorveiga">Victor Veiga</a>
                                        <span> - </span>
                                        <a href="https://github.com/lucasbrendow">Lucas Brendow</a>
                                        <a style={{display: 'block'}} href="">Raiane Rosa</a>
                                    </p>
                                </div>
                            </div>
                            
                        </form>

                    </div>     
                        
                </div>
            </div>
        </div>
    );
}