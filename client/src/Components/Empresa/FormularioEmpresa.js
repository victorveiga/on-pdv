import React, { Component } from 'react';
import api from '../../services/api';

class FormularioEmpresa extends Component {

    constructor(props){
        super(props);

        if (!props.dados){
            this.state = {
                id: null,
                nome: '',
                nome_fantasia: '',
                inscricao: '',
                insricaoEstadual: '',
                end_telefone: '',
                email: ''
            }
        } else {
            this.state = props.dados;
        }   
    }

    async handleSave(){

        try {
            const dados = {
                id: this.state.id,
                nome: this.state.nome,
                nome_fantasia: this.state.nome_fantasia,
                inscricao: this.state.inscricao,
                insricaoEstadual: this.state.insricaoEstadual,
                end_telefone: this.state.end_telefone,
                email: this.state.email
            }
    
            let response = null;
    
            if (dados.id > 0){  
                response = await api.put(`empresa/${dados.id}`, dados , {
                    headers: {
                        authorization: 'Bearer '+localStorage.getItem('auth-token')
                    }
                });  
            } else {
                delete dados.id;
                response = await api.post(`empresa`, dados, {
                    headers: {
                        authorization: 'Bearer '+localStorage.getItem('auth-token')
                    }
                });
            }
     
        } catch (error) {
            alert(error)
            localStorage.clear()
            window.location.reload();
        }
    }

    render(){
        return (
            <form onSubmit={e => {this.handleSave(e)}}>

                <div className="form-group">
                    <label>Nome Empresarial</label>
                    <input 
                        type="text" 
                        id="nome"
                        name="nome"
                        className="form-control" 
                        placeholder="Razão social da empresa" 
                        value={this.state.nome}
                        onChange={e => this.setState({nome: e.target.value})}
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>CNPJ/CPF</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Incrição da empresa" 
                            value={this.state.inscricao}
                            onChange={e => this.setState({inscricao: e.target.value})}
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

                <button type="button" className="btn btn-danger mr-2" onClick={() => this.props.voltar()}>Cancelar</button>
                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        );
    }
}

export default FormularioEmpresa;