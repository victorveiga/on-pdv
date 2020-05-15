import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';
import logo from '../../assets/logo.png';
import './style.css';
import api from '../../services/api';
import $ from 'jquery';

import JanelaUsuario from '../../Components/Usuario/JanelaUsuario';
import JanelaProduto from '../../Components/Produto/JanelaProduto';
import JanelaOrcamento from '../../Components/Orcamento/JanelaOrcamento';
import JanelaPagamento from '../../Components/Pagamento/JanelaPagamento';

import VendaClass from '../../Classes/VendaController';

class Venda extends Component {
    constructor(props){
        super(props);

        this.state = {
            empresa: {
                nome: 'Nome do mercado'
            },
            usuario: 'Sem usuário',
            usuarioId: null,
            inputProduto: '',
            inputQtde: '',
            inputDesconto: '',
            showJanelaUsuario: false,
            showProduto: false,
            showOrcamento: false,
            showConfirmFechamento: false,
            showPagamento: false,
            totalLiquido: 0,
            idCaixa: 0
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

            const response_caixa = await api.get(`caixa_controler`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token')
            }});

            if (!response_caixa.data.idUsuario)
                this.setState({showJanelaUsuario: true});
            else
                this.setState({usuario: response_caixa.data.nome, usuarioId: response_caixa.data.idUsuario, idCaixa: response_caixa.data.id});    

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

    /** Eventos de botões */
    async handleSave(){

        if (this.venda.xItems.length <= 0) return
        if (!this.state.usuarioId) return alert('Ops! O caixa não está aberto!')

        const data = new Date();
        this.venda.setDataOperacao(`${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`);
        this.venda.AddUsuario({id: this.state.usuarioId, nome: this.state.usuario});
        this.venda.setCaixa(this.state.idCaixa);

        try {
            let response = null;
            if (!this.venda.getId()){
                response = await api.post('venda/', this.venda,{headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }});
            } else {
                response = await api.put(`venda/${this.venda.getId()}`, this.venda,{headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }});
            }   

            if (response.data.idVenda) this.props.history.push(`/relatorio-venda/${response.data.idVenda}`);
            else alert('Ops! Algo de errado aconteceu e a venda não foi salva, por favor, tente novamente!');
            
        } catch (error) {
            alert(error);
            localStorage.clear();
            window.location.reload();
        }
    }

    handleEscape(){
        this.setState({showConfirmFechamento: true});
    }

    handleOrcamento(){
        this.setState({showOrcamento: true})
        $('#venda_principal #produto').focus();
    }

    async sairDaVenda(finalizarCaixa = false){
        if (finalizarCaixa){
            try {
                const response = await api.post('caixa_controler_fechamento/', {idUsuario: this.state.usuarioId},{headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }});

                if (response.data == 'fechado')
                    this.props.history.push('/');
                else {
                    alert('Não foi possível fechar o caixa', response.data);
                    return    
                }    
            } catch (error) {
                alert(error);
                localStorage.clear();
                window.location.reload();
            }
        }
            
        this.props.history.push('/');
    }

    /** Fim dos Eventos de botões */

    handleKeyDown(e, self){

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
            this.handleOrcamento();
        }

        if (e.keyCode === 27){
            this.handleEscape();
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
       
        this.setState({totalLiquido: this.venda.CalcularTotalLiquido()});
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
            
            self.venda.setId(aux_orcamento.id);
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

        this.setState({totalLiquido: this.venda.CalcularTotalLiquido()});
        self.forceUpdate();
        $('#venda_principal #produto').focus();
    }

    render(){

        return (<>
            <Modal
                show={this.state.showConfirmFechamento}
                onHide={() => {this.setState({showConfirmFechamento: false})}}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Fechamento de caixa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Deseja realizar o fechamento de caixa agora?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary"   onClick={() => this.sairDaVenda(true)}>Fechar o caixa agora</Button>
                    <Button variant="secondary" onClick={() => this.sairDaVenda()}>Deixar o caixa aberto</Button>
                    <Button variant="secondary" onClick={() => this.setState({showConfirmFechamento: false})}>Cancelar</Button>
                </Modal.Footer>
            </Modal>

            <JanelaUsuario
                show={this.state.showJanelaUsuario}
                onHide={() => this.setState({showJanelaUsuario: false})}
                selecionarRegistro={async (data) => {

                    if (!data){
                        window.location.reload();
                    }

                    let idUsuario   = null
                    let nomeUsuario = null;
                    let idCaixa     = null;

                    this.setState({showJanelaUsuario: false});
                    
                    try {
                        const response = await api.post(`caixa_controler`, {idUsuario: data.id}, {headers: {
                            authorization: 'Bearer '+localStorage.getItem('auth-token')
                        }});


                        if (response.data.idCaixa) {
                            idUsuario        = response.data.usuario.id;
                            nomeUsuario      = response.data.usuario.nome;
                            idCaixa          = response.data.idCaixa;
                        }

                        this.setState({usuario: nomeUsuario, usuarioId: idUsuario, idCaixa});
                    } catch (error) {
                        alert(error);
                        localStorage.clear();
                        window.location.reload();
                    }
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
            <JanelaPagamento
                show={this.state.showPagamento}
                onHide={() => this.setState({showPagamento: false})}
                venda={this.venda}
                handleSave={() => this.handleSave()}
            />
            <div id="venda_principal" className="container" onKeyDown={(e) => this.handleKeyDown(e,this)}>

                <div id="cabecalho">
                    <h1>{this.state.empresa.nome}</h1>
                    <h4>Caixa 1</h4>
                    <h5>{this.state.usuario}</h5>
                </div>

                <div id="conteudo">
                    <div className="row">
                        <div className="col-md-6" id="clogo">
                            <img width="50%" src={logo} alt="on-pdv software"/>
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
                </div>

                <div id="botoes">
                    <Button onClick={() => this.handleEscape()}>Menu (ESC)</Button>
                    <Button onClick={() => {
                        if (this.venda.xItems.length <= 0) {
                            alert('Inicie uma venda antes de continuar')
                            return
                        }    
                        this.setState({showPagamento: true})
                    }}>Finalizar (F9)</Button>
                    <Button onClick={(e) => this.handleOrcamento()}>Orçamentos (F10)</Button>
                </div>
            </div>
        </>);
    }
}

export default Venda;