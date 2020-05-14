import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import api from '../../../services/api';
import './style.css';
import Lib from '../../../Lib';

import ModalLancarData from '../../../Components/ModalLancarData';

class ConferenciaCaixa extends Component {
    constructor(props){
        super(props);

        this.state = {
            empresa: {},
            periodo: {
                inicio: '',
                fim: ''
            },
            showFormData: false,
            caixas: []
        }
    }

    async carregarDados(inicio, fim){
        try {
            const response = await api.get(`res_conferencia_caixa?inicio=${inicio}&fim=${fim}`, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            })

            console.log(response);
            this.setState({
                periodo: {inicio,fim}, 
                empresa: response.data.empresa,
                caixas: response.data.caixa
            });
        } catch (error) {
            alert(error);
            localStorage.clear();
            this.props.history.push('/');
        }
    }

    render(){

        function _montarTotais(vendas){
            if ((!vendas) || (vendas.length <= 0)) 
                return (
                    <span className="text-danger">Não possui movimentação</span>
                );
            else 
                return (
                    <table style={{margin: '0 auto', width: '100%'}} id="tabela_detalhes">
                        <thead>
                            <tr>
                                <th>Forma de pagamento</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map(item => (
                                <tr>
                                    <td>{item.formapagamento}</td>
                                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
        }

        return (<>
            <ModalLancarData 
                show={this.state.showFormData}
                onHide={(inicio,fim) => {
                    this.carregarDados(inicio,fim)
                    this.setState({showFormData: false})
                }}
            />
            <div className="container" id="relatorio_fechamento_caixa" style={{marginTop: '20px'}}>
                <h1 style={{textAlign: 'center'}}>{this.state.empresa.nome}</h1>
                <h4 style={{textAlign: 'center'}}>Relatório de conferência do caixa</h4>
                <hr/>
                <h5 style={{marginTop: '30px'}}>Período: {Lib.getDataString(this.state.periodo.inicio)} até {Lib.getDataString(this.state.periodo.fim)}</h5>

                <div id="botoes" style={{marginBottom: '30px'}}>
                    <Button className="btn-danger mr-2" onClick={() => window.history.back()}>Voltar</Button>
                    <Button className="btn-warning mr-2" onClick={() => this.setState({showFormData: true})}>Nova Consulta</Button>
                    <Button onClick={() => {
                        document.getElementById('botoes').style.display = 'none';
                        window.print();
                        document.getElementById('botoes').style.display = 'flex';
                    }}>Imprimir</Button>
                </div> 
                
                <div id="caixas">
                   {this.state.caixas.map(caixa => (
                       <div style={{marginBottom: '10px'}}>
                            <div><span style={{fontWeight: 'bold'}}>Usuário: </span> {`${caixa.idUsuario} - ${caixa.nome}`}</div>
                            <div><span style={{fontWeight: 'bold'}}>Abertura: </span> {Lib.getDataString(caixa.abertura)}</div>
                            <div><span style={{fontWeight: 'bold'}}>Fechamento: </span> {Lib.getDataString(caixa.fechamento)}</div>
                            {_montarTotais(caixa.vendas)}
                            <hr/>
                       </div>
                   ))} 
                </div> 
            </div>
        </>);
    }
}

export default ConferenciaCaixa;