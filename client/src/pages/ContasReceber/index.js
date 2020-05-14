import React, {Component} from 'react';
import logo from '../../assets/logo.png';
import {Table, Button} from 'react-bootstrap';
import './index.css';
import api from '../../services/api';

import ModalLancarDataValor from '../../Components/ModalLancarDataValor';
import Titulo from '../../Classes/Titulo';

class ContasReceber extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            showInput: false,
            duplicata: null
        }

        this.titulos = [];
    }

    async carregarDados(){
        
        try {
            const response = await api.get('res_contas_receber',  { headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token')
            }});

            this.titulos = [];

            response.data.map(item => (
                this.titulos.push(new Titulo(item))
            ));

            this.setState({content: this.montarPage1()});

        } catch (error) {
            alert(error);
            localStorage.clear();
            this.props.history.push('/');
        }

        this.forceUpdate();
        
    }

    componentDidMount(){
        this.carregarDados();
    }

    handlePage2(duplicatas){
        this.setState({content: this.montarPage2(duplicatas, this)})
    }

    montarPage1(){
        return (
            <div id="page1" style={{overflowY: 'auto', maxHeight: '400px'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Venda</th>
                            <th>Cliente</th>
                            <th>Parcelas</th>
                        </tr>
                    </thead>
                    <tbody className="mt-2">
                        {this.titulos.map(titulo => (
                            <tr key={titulo.venda} onClick={() => this.handlePage2(titulo.duplicatas)}>
                                <td>{titulo.venda}</td>
                                <td>{titulo.nomecliente}</td>
                                <td>{titulo.total_numero_parcela}</td>
                            </tr>
                        ))} 
                    </tbody>
                </Table> 
            </div>
        );
    }

    montarPage2(duplicatas, self){

        function _carregaBotao(duplicata){

            if (duplicata.valor_pago <= 0) {
                return (
                    <td>
                        <Button 
                            className="btn-secondary"
                            onClick={() => self.setState({showInput: true, duplicata: duplicata})}
                        >Baixar</Button>
                    </td>
                );
            } else if (parseInt(duplicata.valor_pago) == parseInt(duplicata.valor)){
                return (
                    <td>
                        <span className="text-success" style={{fontWeight: 'bold'}}>Baixado</span>
                    </td>
                );
            } else if (duplicata.valor_pago < duplicata.valor) {
                return (
                    <td>
                        <span className="text-danger" style={{fontWeight: 'bold'}}>Baixado</span>
                    </td>
                );
            } else if (duplicata.valor_pago > duplicata.valor) {
                return (
                    <td>
                        <span className="text-warning" style={{fontWeight: 'bold'}}>Baixado</span>
                    </td>
                );
            }    
        }

        return (
            <div id="page2" style={{overflowY: 'auto', maxHeight: '400px'}}>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Parcela</th>
                            <th>Descrição</th>
                            <th>Valor Pago</th>
                            <th>Baixar</th>
                        </tr>
                    </thead>
                    <tbody>
                 
                        {duplicatas.map(duplicata => (
                            <tr key={duplicata.id}>
                                <td>{duplicata.parcela}</td>
                                <td>{duplicata.descricao}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(duplicata.valor_pago)}</td>
                                {_carregaBotao(duplicata)}
                            </tr>
                        ))}
                     
                    </tbody>
                </Table>
            </div>
        );
    }

    async atualizarDuplicata(duplicata){
        try {

            const dados = {
                id: duplicata.id,
                pagamento: duplicata.pagamento,
                valor_pago: duplicata.valor_pago
            }

            await api.put('res_contas_receber', dados, { headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token')
            }});

            this.carregarDados();

        } catch (error) {
            alert(error);
            localStorage.clear();
            this.props.history.push('/');
        }
    }

    render(){
        return (<>
            <ModalLancarDataValor
                duplicata={this.state.duplicata}
                show={this.state.showInput}
                onHide={(duplicata) => {
                    this.setState({showInput: false});

                    if (duplicata){
                        this.atualizarDuplicata(duplicata);
                    }    
                }}
            />
            <div>
                <div className="container">
    
                    <div id="contas_receber_principal">
    
                        <div id="contas_receber_principal_container">
    
                            <div className="row" id="contas_receber_cabecalho">                            
                                <div className="col-md-1" id="home_logo" style={{display: "pointer"}}>
                                    <h1><img src={logo} height="80px" width="80px" alt="logo"/></h1>
                                </div>
                                <div className="col-md-6" id="home_logo" style={{display: "pointer"}}>
                                    <span className="display-4">Contas a Receber</span>
                                </div>
                            </div>
                            
                            <div id="contas_receber_conteudo">
    
                                <div className="col-md-12 mx-auto">
    
                                    {this.state.content}
            
                                    <div id="botoes" className="mt-2 mb-2" width="100%">
                                        <div className="row">
                                            <div className="col-12">
                                                <Button className="btn-primary ml-2" onClick={() => this.setState({content: this.montarPage1()})}>Voltar</Button>
                                                <Button className="btn-danger ml-2" onClick={() => this.props.history.push('/')}>Sair</Button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                        
                                </div>
    
                            </div>
    
                        </div>
    
                    </div>
                </div>
            </div>    
        </>);
    }

}

export default ContasReceber;