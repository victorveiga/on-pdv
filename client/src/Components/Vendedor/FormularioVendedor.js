import React, { Component } from 'react';
import api from '../../services/api';
import Lib from '../../Lib';

class FormularioVendedor extends Component {

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
                comissao: '',
                dataAdmissao: '',
            }
        } else {
            this.state = {
                id: props.dados.id,
                nome: props.dados.nome,
                sexo: props.dados.sexo,
                end_telefone: props.dados.end_telefone,
                email: props.dados.email,
                cpf: props.dados.cpf,
                comissao: props.dados.comissao,
                dataAdmissao: Lib.getDataStringYMD(props.dados.dataAdmissao)
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
            comissao      : this.state.comissao,
            dataAdmissao  : this.state.dataAdmissao
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`vendedor/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            delete dados.id;
            response = await api.post(`vendedor`, dados, {
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
                            onChange={e => this.setState({cpf: e.target.value})}
                            required
                            maxLength="11"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
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
                    <div className="form-group col-md-6">
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
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Comissão (%)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            className="form-control" 
                            placeholder="Porcentagem de comissão do vendedor" 
                            value={this.state.comissao}
                            onChange={e => this.setState({comissao: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Data de admissão</label>
                        <input 
                            type="date" 
                            className="form-control" 
                            placeholder="Data de entrada do vendedor" 
                            value={this.state.dataAdmissao}
                            onChange={e => this.setState({dataAdmissao: e.target.value})}
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

export default FormularioVendedor;