import React, { Component } from 'react';
import api from '../../services/api';

class FormularioCliente extends Component {

    constructor(props){
        super(props);
        if (!props.dados){
            this.state = {
                id: null,
                nome: '',
                sexo: '',
                end_telefone: '',
                email: '',
                cpf: '',
                whatsapp: ''
            }
        } else {
            this.state = {
                id: props.dados.id,
                nome: props.dados.nome,
                sexo: props.dados.sexo,
                end_telefone: props.dados.end_telefone,
                email: props.dados.email,
                cpf: props.dados.cpf,
                whatsapp: props.dados.whatsapp
            }
        }
        
    }

    async handleSave(e){
        e.preventDefault();

        const dados = {
            id            : this.state.id,
            nome          : this.state.nome,
            sexo          : this.state.sexo,
            end_telefone  : this.state.end_telefone,
            email         : this.state.email,
            cpf           : this.state.cpf,
            whatsapp      : this.state.whatsapp
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`cliente/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            delete dados.id;
            response = await api.post(`cliente`, dados, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });
        }

        if (response){
            this.props.carregar();
        }

    }

    render(){
        return (
            <form onSubmit={e => {this.handleSave(e)}}>

                <div className="form-group">
                    <label>Nome</label>
                    <input 
                        type="text" 
                        id="nome"
                        name="nome"
                        className="form-control" 
                        placeholder="Nome do usuário" 
                        value={this.state.nome}
                        onChange={e => this.setState({nome: e.target.value})}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Sexo</label>
                        <select 
                          className="form-control" 
                          placeholder="Sexo do usuário" 
                          value={this.state.sexo} 
                          onChange={e => this.setState({sexo: e.target.value})}
                          required>
                            <option value="" selected>Escolher...</option>
                            <option value="F">0 - Feminino</option>
                            <option value="M">1 - Masculino</option>
                            <option value="N">Não binário</option>
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label>CPF</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="CPF" 
                            value={this.state.cpf}
                            maxLength="11"
                            onChange={e => this.setState({cpf: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label>Contato</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Telefone de contato" 
                            value={this.state.end_telefone}
                            onChange={e => this.setState({end_telefone: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>E-mail</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="E-mail" 
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Whatsapp</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Whatsapp para notificações" 
                            value={this.state.whatsapp}
                            onChange={e => this.setState({whatsapp: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <button type="button" className="btn btn-danger mr-2" onClick={this.props.cancelar}>Cancelar</button>
                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        );
    }
}

export default FormularioCliente;