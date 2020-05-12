import React, {Component} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import JanelaModal from '../JanelaModal';
import $ from 'jquery';
import JanelaCliente from '../Cliente/JanelaCliente';
//import api from '../../services/api';

class JanelaPagamento extends Component {

    constructor(props){
        super(props);

        this.state = {
            total: 0,
            formaPagameto: 1,
            parcelas: 0,
            inputVistaValor: 0,
            inputVistaTroco: 0,
            showClientes: false
        }

    }

    componentDidMount(){
        //
    }

    adicionarCliente(self,data){
        self.setState({showClientes: false});

        if (!data) return

        self.props.venda.AddCliente(data);
    }

    render(){
        return (<>
            <JanelaCliente
                show={this.state.showClientes}
                onHide={() => this.setState({showClientes: false})}
                size="lg"
                selecionarRegistro={(data) => this.adicionarCliente(this,data)}
            />
            <JanelaModal
                onShow={() => {
                    this.setState({total: this.props.venda.totalLiquido})
                }}
                {...this.props}
                content={<div className="p-4">
                    <div className="row">
                        <div className="col-md-6">
                            <Form className="border p-2" style={{alignItems: 'center', width: '100%'}}>
                                <div>
                                    <label>Informe a forma de pagamento</label>
                                </div>
                                <div key={'custom-inline-radio'} className="mb-3">
                                    <Form.Check
                                        custom
                                        inline
                                        label="À vista"
                                        type={'radio'}
                                        name={'forma-pagamento'}
                                        id={`forma-pagamento-dinheiro`}
                                        value="1"
                                        checked={this.state.formaPagameto==1}
                                        onChange={(e) => this.setState({formaPagameto: e.target.value})}
                                    />
                                    <Form.Check
                                        custom
                                        inline
                                        label="A prazo"
                                        type={'radio'}
                                        name={'forma-pagamento'}
                                        id={'forma-pagamento-prazo'}
                                        value="2"
                                        checked={this.state.formaPagameto==2}
                                        onChange={(e) => this.setState({formaPagameto: e.target.value})}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                    
                    <div className='mt-4'>
                        <div className='row'>
                            <div className={`col-md-6 p-2 ${this.state.formaPagameto==1?'border border-success':''}`}>
                                <div>
                                    <label>Total à vista</label>
                                    <input type="text" className="form-control" value={ Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.total) } disabled/>
                                </div>
                                <div className="mt-2">
                                    <label>Valor pago</label>
                                    <input 
                                        id="pagamento-valor-pago-a-vista"
                                        type="number" 
                                        step="0.01" 
                                        className="form-control"
                                        value={this.state.inputVistaValor}
                                        onChange={(e) => {
                                            this.setState({inputVistaValor: e.target.value, inputVistaTroco: e.target.value - this.state.total})
                                        }}
                                    />
                                </div>
                                <div className="mt-2">
                                    <label>Troco</label>
                                    <input 
                                        className="form-control"
                                        value={ Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.inputVistaTroco) }
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className={`col-md-6 p-2 ${this.state.formaPagameto==2?'border border-success':''}`}>
                                <div>
                                    <label>Total a prazo</label>
                                    <input type="text" className="form-control" value={ Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.total) } disabled/>
                                </div>
                                <div className="mt-2">
                                    <label>Quantidades de parcelas</label>
                                    <select
                                        className="form-control"
                                        placeholder="Parcelas"
                                        value={this.state.parcelas}
                                        onChange={e => this.setState({parcelas: e.target.value})}
                                        required> 

                                        { [1,2,3,4,5,6,7,8,9,10,11,12].map( item => (
                                            <option key={item} value={item}>{item}x de {Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.total / item)}</option>
                                        ) ) }
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label>Cliente</label>
                                    <div className="input-group mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Nome do cliente" 
                                            aria-label="Nome do cliente" 
                                            aria-describedby="basic-addon2" 
                                            value={this.props.venda.cliente.nome}
                                            disabled/>
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-primary" type="button" onClick={() =>  this.setState({showClientes: true})}>Alterar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{display:"flex", textAlign:"center", justifyContent:"center", marginTop: "20px"}}>
                        <Button className="btn-success" onClick={() => {

                            if (this.state.formaPagameto == 1){

                                if (!this.state.inputVistaValor){
                                    alert('Informe o valor pago');
                                    $('#pagamento-valor-pago-a-vista').focus();
                                    return
                                }

                                if (this.state.inputVistaValor < this.state.total){
                                    alert('O valor total ainda não foi recebido');
                                    return
                                }

                            } else if (this.state.formaPagameto == 2){
                                if (!this.props.venda.cliente.nome){
                                    alert('Informe um cliente antes de continuar');
                                    return
                                }

                                this.props.venda.setParcelas(this.state.parcelas);

                            } else {
                                alert('Informe uma forma de pagamento antes de continuar');
                                return 
                            }

                            this.props.venda.setFormaPagamento(this.state.formaPagameto);
                            this.props.handleSave();
                            
                        }}>Finalizar</Button>
                    </div>

                </div>}
                titulo={"Pagamento"}
            />
        </>);
    }  
}

export default JanelaPagamento;