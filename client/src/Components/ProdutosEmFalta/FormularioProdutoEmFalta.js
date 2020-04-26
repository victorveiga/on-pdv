import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import api from '../../services/api';

import Produtos from '../Produto/JanelaProduto';
import Vendedores from '../Vendedor/JanelaVendedor';
import Cliente from '../Cliente/JanelaCliente';

class FormularioProduto extends Component {

    constructor(props){
        super(props);
        if (!props.dados){
            this.state = {
                id           : null,
                dataFalta    : '',
                dataChegada  : '',
                produto_id   : '',
                nome         : '',
                idCliente    : '',
                nomeCliente  : '',
                idVendedor   : '',
                nomeVendedor : '',

                showVendedores : false,
                showClientes   : false,
                showProdutos   : false
            }
        } else {
            this.state = {
                id           : props.dados.id,
                dataFalta    : props.dados.dataFalta,
                dataChegada  : props.dados.dataChegada,
                produto_id   : props.dados.produto_id,
                nome         : props.dados.nome,
                idCliente    : props.dados.idCliente,
                nomeCliente  : props.dados.nomeCliente,
                idVendedor   : props.dados.idVendedor,
                nomeVendedor : props.dados.nomeVendedor
            }
        }        
    }

    async handleSave(e){
        e.preventDefault();

        if (this.state.nome == ''){ this.setState({showProdutos: true}); return }
        if (this.state.nomeVendedor == ''){ this.setState({showVendedores: true}); return }
        if (this.state.nomeCliente == ''){ this.setState({showClientes: true}); return }

        const dados = {
            dataFalta     : this.state.dataFalta,
            dataChegada   : this.state.dataChegada,
            produto_id    : this.state.produto_id,
            nome          : this.state.nome,
            idCliente     : this.state.idCliente,
            nomeCliente   : this.state.nomeCliente,
            idVendedor    : this.state.idVendedor,
            nomeVendedor  : this.state.nomeVendedor
        }

        if ((!dados.dataChegada) || (dados.dataChegada === null) || dados.dataChegada == ''){
            delete dados.dataChegada;
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`produtoFalta/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            delete dados.id;
            response = await api.post(`produtoFalta`, dados, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });
        }

        if (response){
            this.props.carregar();
        }

    }

    adicionarProduto(classe, data){

        if (!data){return}

        classe.setState({produto_id: data.id, nome: data.nome, showProdutos: false});
    }

    adicionarVendedor(classe, data){

        if (!data){return}

        classe.setState({idVendedor: data.id, nomeVendedor: data.nome, showVendedores: false});
    }   

    adicionarCliente(classe, data){

        if (!data){return}

        classe.setState({idCliente: data.id, nomeCliente: data.nome, showClientes: false});
    }

    render(){
        return (<>
            <Produtos 
                show={this.state.showProdutos}
                onHide={() => this.setState({showProdutos: false})}
                size="lg"
                selecionarRegistro={(data) => this.adicionarProduto(this, data)}
            />
            <Vendedores 
                show={this.state.showVendedores}
                onHide={() => this.setState({showVendedores: false})}
                size="lg"
                selecionarRegistro={(data) => this.adicionarVendedor(this,data)}
            />
            <Cliente
                show={this.state.showClientes}
                onHide={() => this.setState({showClientes: false})}
                size="lg"
                selecionarRegistro={(data) => this.adicionarCliente(this,data)}
            />
            <form onSubmit={e => {this.handleSave(e)}}>

                <div className="form-row">               
                    <div className="form-group col-md-12">
                        <div className="form-row">
                            <div className="col-md-11">
                                <label>Nome</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nome do Produto" 
                                    value={this.state.nome}
                                    onChange={e => this.setState({codigo: e.target.nome})}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-1" style={{marginTop: '32px'}}>
                                <Button variant={"outline-primary"} onClick={() => this.setState({showProdutos: true})}><FaSearch size={19} /></Button>
                            </div>
                        </div>

                    </div>
                </div>
 
                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Data da Falta</label>
                        <input 
                            type="date"  
                            className="form-control" 
                            placeholder="Data da falta" 
                            value={this.state.dataFalta}
                            onChange={e => this.setState({dataFalta: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label>Data da Chegada</label>
                        <input 
                            type="date"  
                            className="form-control" 
                            placeholder="Data da Chegada" 
                            value={this.state.dataChegada}
                            onChange={e => this.setState({dataChegada: e.target.value})}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="col-md-11">
                            <label>Nome do Vendedor</label>
                                <input 
                                    type="text"  
                                    className="form-control" 
                                    placeholder="Nome do Vendedor" 
                                    value={this.state.nomeVendedor}
                                    onChange={e => this.setState({nomeVendedor: e.target.value})}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-1" style={{marginTop: '32px'}}>
                                <Button variant={"outline-primary"} onClick={() => this.setState({showVendedores: true})}><FaSearch size={19} /></Button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-md-6">
                        <div className="form-row">
                            <div className="col-md-11">
                                <label>Nome do Cliente</label>
                                <input 
                                    type="text"  
                                    className="form-control" 
                                    placeholder="Data do Cliente" 
                                    value={this.state.nomeCliente}
                                    onChange={e => this.setState({nomeCliente: e.target.value})}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="form-group col-md-1" style={{marginTop: '32px'}}>
                                <Button variant={"outline-primary"} onClick={() => this.setState({showClientes: true})}><FaSearch size={19} /></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-danger mr-2" onClick={this.props.cancelar}>Cancelar</button>
                <button type="submit" className="btn btn-success">Salvar</button>
            </form>
        </>);
    }
}

export default FormularioProduto;