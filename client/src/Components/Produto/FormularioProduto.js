import React, { Component } from 'react';
import api from '../../services/api';

class FormularioProduto extends Component {

    constructor(props){
        super(props);
        if (!props.dados){
            this.state = {
                id: null,
                codigo: '',
                referencia: '',
                descricao: '',
                preco: '',
                desconto: '',
                NCM: '',
                CEST: ''
            }
        } else {
            this.state = {
                id: props.dados.id,
                codigo: props.dados.codigoBarras,
                referencia: props.dados.codigoReferencia,
                descricao: props.dados.nome,
                preco: props.dados.preco,
                desconto: props.dados.descontoMaximo,
                NCM: props.dados.ncm,
                CEST: props.dados.cest
            }
        }
        
    }

    async handleSave(e){
        e.preventDefault();

        const dados = {
            codigoBarras     : this.state.codigo,
            codigoReferencia : this.state.referencia,
            nome             : this.state.descricao,
            preco            : this.state.preco,
            descontoMaximo   : this.state.desconto,
            ncm              : this.state.NCM,
            cest             : this.state.CEST
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`produto/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            delete dados.id;
            response = await api.post(`produto`, dados, {
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
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Código</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Código de barras" 
                            value={this.state.codigo}
                            onChange={e => this.setState({codigo: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label>Referência</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Código de referência" 
                            value={this.state.referencia}
                            onChange={e => this.setState({referencia: e.target.value})}
                        />
                    </div>
                </div>
            
                <div className="form-group">
                    <label>Descrição</label>
                    <input 
                        type="text" 
                        id="descricao"
                        name="username"
                        className="form-control" 
                        placeholder="Descrição do produto" 
                        value={this.state.descricao}
                        onChange={e => this.setState({descricao: e.target.value})}
                        required
                    />
                </div>
                
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Preço</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            className="form-control" 
                            placeholder="Valor un." 
                            value={this.state.preco}
                            onChange={e => this.setState({preco: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label>Desconto (%)</label>
                        <input 
                            ttype="number" 
                            step="0.01" 
                            className="form-control" 
                            placeholder="Máximo" 
                            value={this.state.desconto}
                            onChange={e => this.setState({desconto: e.target.value})}
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label>NCM</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="NCM" 
                            value={this.state.NCM}
                            onChange={e => this.setState({NCM: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label>CEST</label>
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Cod. CEST" 
                            value={this.state.CEST}
                            onChange={e => this.setState({CEST: e.target.value})}
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

export default FormularioProduto;