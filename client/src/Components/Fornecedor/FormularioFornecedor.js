import React, { Component } from 'react';
import api from '../../services/api';

class FormularioFornecedor extends Component {

    constructor(props){
        super(props);
        if (!props.dados){
            this.state = {
                id: null,
                nome: '',
                end_telefone: '',
                email: '',
                cnpj: '',
                insricaoEstadual: ''
            }
        } else {
            this.state = {
                id: props.dados.id,
                nome: props.dados.nome,
                end_telefone: props.dados.end_telefone,
                email: props.dados.email,
                cnpj: props.dados.cnpj,
                insricaoEstadual: props.dados.insricaoEstadual
            }
        }
        
    }

    async handleSave(e){
        e.preventDefault();

        const dados = {
            id               : this.state.id,
            nome             : this.state.nome,
            end_telefone     : this.state.end_telefone,
            email            : this.state.email,
            cnpj              : this.state.cnpj,
            insricaoEstadual : this.state.insricaoEstadual
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`fornecedor/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            delete dados.id;
            response = await api.post(`fornecedor`, dados, {
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
                        <label>CNPJ</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="CNPJ" 
                            value={this.state.cnpj}
                            onChange={e => this.setState({cnpj: e.target.value})}
                            required
                            maxLength="15"
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Inscrição Estadual</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Inscrição Estadual" 
                            value={this.state.insricaoEstadual}
                            onChange={e => this.setState({insricaoEstadual: e.target.value})}
                            required
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

                <button type="button" className="btn btn-danger mr-2" onClick={this.props.cancelar}>Cancelar</button>
                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        );
    }
}

export default FormularioFornecedor;