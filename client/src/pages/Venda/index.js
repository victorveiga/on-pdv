import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import './style.css';
import api from '../../services/api';
import $ from 'jquery';

import JanelaUsuario from '../../Components/Usuario/JanelaUsuario';
import JanelaProduto from '../../Components/Produto/JanelaProduto';
import JanelaOrcamento from '../../Components/Orcamento/JanelaOrcamento';

import VendaClass from '../../Classes/VendaController';

class Venda extends Component {
    constructor(props){
        super(props);

        this.state = {
            empresa: {
                nome: 'Nome do mercado'
            },
            usuario: {
                nome: 'Sem usuário'
            },
            inputProduto: '',
            inputQtde: '',
            inputDesconto: '',
            showJanelaUsuario: false,
            showProduto: false,
            showOrcamento: false
        }

        this.venda = new VendaClass();
    }

    async carregarEmpresa(){
        try {
            const response = await api.get(`empresa/`, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            })

            let aux_data = null;
            if (response.data){
                if (response.data[0])
                    aux_data = response.data[0]
                else    
                    aux_data = response.data;
            }

            this.setState({empresa: aux_data});
            this.setState({showJanelaUsuario: true});
        } catch (error) {
            alert(error)
            localStorage.clear();
            window.location.reload();
        }
    }

    componentDidMount(){
        this.carregarEmpresa();
        $('#venda_principal #produto').focus();
    }

    handleKeyDown(e, self){

        console.log(e.keyCode)

        if (e.keyCode === 13){
            
            if (!self.state.inputProduto) 
                self.setState({showProduto: true});

            else if ($('#venda_principal #chkModoDireto').is(':checked')) {

                this.setState({inputQtde: 1});
                this.adicionarProduto();

            } else if (!self.state.inputQtde)
                $('#venda_principal #quantidade').focus();

            else if ((self.state.inputQtde))
                this.adicionarProduto();

        }

        if (e.keyCode === 121){
            this.setState({showOrcamento: true})
            $('#venda_principal #produto').focus();
        }

        if (e.keyCode === 27){
            this.props.history.push('/');
        }
        
    }

    async adicionarProduto(produto = null, qtde=null, desconto=null){

        if (produto)  this.setState({inputProduto: produto});
        if (qtde)     this.setState({inputQtde: qtde});
        if (desconto) this.setState({inputDesconto: desconto});

        if (!this.state.inputProduto) return
        if (!this.state.inputQtde) return

        try {
            const response = await api.get(`produto`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token'),
                search: this.state.inputProduto
            }});

            let aux_produto = null;
            if (response.data){
                if (response.data[0])
                    aux_produto = response.data[0]
                else 
                    aux_produto = response.data
            }

            aux_produto.quantidade = this.state.inputQtde;
            aux_produto.desconto   = this.state.inputDesconto;

            this.venda.AddItem(aux_produto)
        } catch (error) {
            alert(error);
            localStorage.clear();
            window.location.reload();
        }
       
        this.setState({inputProduto: '', inputQtde: '', inputDesconto: ''});
        $('#venda_principal #produto').focus();
    }

    adicionarRegistro(data,self){
        self.setState({showProduto: false})
        self.setState({inputProduto: data.codigoBarras})
    }

    async adicionarOrcamento(data,self){
        self.setState({showOrcamento: false});
        
        try {
            const response = await api.get(`orcamento/${data.id}`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token')
            }});

            if (!response.data.venda) return
            let aux_orcamento = null;

            if (response.data.venda[0]){
                aux_orcamento = response.data.venda[0];
            } else {
                aux_orcamento = response.data.venda;
            }

            self.venda = new VendaClass();

            self.venda.setDataOperacao(aux_orcamento.dataOperacao);
            self.venda.setNumero(aux_orcamento.numero);
            self.venda.setSerie(aux_orcamento.serie);
            
            self.venda.vendedor.id   = aux_orcamento.idVendedor;
            self.venda.vendedor.nome = aux_orcamento.nome_vendedor;
            self.venda.cliente.id    = aux_orcamento.idCliente;
            self.venda.cliente.nome  = aux_orcamento.nome_cliente;

            self.venda.totalBruto    = aux_orcamento.totalBruto;   
            self.venda.totalDesconto = aux_orcamento.totalDesconto;
            self.venda.totalLiquido  = aux_orcamento.totalLiquido; 

            response.data.itens.map(item => (
                self.venda.AddItem(item)
            ));
            
        } catch (error) {
            alert(error);
            localStorage.clear();
            window.location.reload();
        }

        self.forceUpdate();
        $('#venda_principal #produto').focus();
    }

    render(){

        return (<>
            <JanelaUsuario
                show={this.state.showJanelaUsuario}
                onHide={() => this.setState({showJanelaUsuario: false})}
                selecionarRegistro={(data) => {

                    if (!data){
                        window.location.reload();
                    }

                    this.setState({showJanelaUsuario: false});
                    this.setState({usuario: data})
                }}
            />
            <JanelaProduto
                show={this.state.showProduto}
                onHide={() => this.setState({showProduto: false})}
                selecionarRegistro={(data) => this.adicionarRegistro(data,this)}
            />
            <JanelaOrcamento
                show={this.state.showOrcamento}
                onHide={() => this.setState({showOrcamento: false})}
                selecionarRegistro={(data) => this.adicionarOrcamento(data,this)}
            />
            <div id="venda_principal" className="container" onKeyDown={(e) => this.handleKeyDown(e,this)}>
                <div id="cabecalho">
                    <h1>{this.state.empresa.nome}</h1>
                    <h4>Caixa 1</h4>
                    <h5>{this.state.usuario.nome}</h5>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <img width="80%" src={logo} alt="on-pdv software"/>
                    </div>
                    <div id="produtos" className="col-md-6">
                        <table>
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Descrição</th>
                                        <th>R$</th>
                                        <th>Qtde</th>
                                        <th>-(%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.venda.getLinhasResumo()}
                                </tbody>
                            </table>
                    </div>
                </div>

                <div className="row">
                    <div id="logo" className="col-md-6">
                        <div>
                            <div>
                                <div>Produto</div>
                                <input 
                                    id="produto" 
                                    className="form-control" 
                                    type="text" 
                                    placeholder="Tecle enter aqui para selecionar um produto"
                                    value={this.state.inputProduto}
                                    onChange={(e) => this.setState({inputProduto: e.target.value})}
                                    onBlur={()=>this.adicionarProduto()}
                                />
                            </div>
                            <div className="row" style={{marginTop: '15px'}}>
                                <div className="col-md-6">
                                    <div>Quantidade</div>
                                    <input 
                                        id="quantidade"
                                        type="number" 
                                        step="0.01" 
                                        className="form-control" 
                                        placeholder="Quantidade"
                                        value={this.state.inputQtde}
                                        onChange={(e) => this.setState({inputQtde: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div>Desconto</div>
                                    <input 
                                        id="desconto"
                                        type="number" 
                                        step="0.01" 
                                        className="form-control" 
                                        placeholder="Desconto"
                                        value={this.state.inputDesconto}
                                        onChange={(e) => this.setState({inputDesconto: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '15px'}}>
                                <div className="col-md-6">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="chkModoDireto" />
                                        <label className="custom-control-label" htmlFor="chkModoDireto">Modo Direto</label>
                                    </div>
                                    <Button style={{marginTop: '15px'}} className="btn-success" onClick={()=> this.adicionarProduto()}>Adicionar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="quadro_totais" className="col-md-6">
                        <table>
                            <tbody>
                                <tr>
                                    <td><h3>Subtotal: </h3></td>
                                    <td><h3>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.venda.CalcularTotalBruto())}</h3></td>
                                    
                                </tr>
                                <tr>
                                    <td><h3>Desconto: </h3></td>
                                    <td><h3>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.venda.CalcularDesconto())}</h3></td>
                                </tr>
                                <tr>
                                    <td><h3>Total: </h3></td>
                                    <td><h3>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.venda.CalcularTotalLiquido())}</h3></td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    
                </div>

                <div id="botoes">
                    <Link to="/"><Button>Menu (ESC)</Button></Link>
                    <Button onClick={() => console.log(this.venda)}>Finalizar (F9)</Button>
                    <Button onClick={(e) => {

                        this.setState({showOrcamento: true})
                        $('#venda_principal #produto').focus();

                    }}>Orçamentos (F10)</Button>
                </div>
            </div>
        </>);
    }
}

export default Venda;