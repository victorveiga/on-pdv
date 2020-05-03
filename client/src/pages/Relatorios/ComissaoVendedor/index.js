import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import api from '../../../services/api';
import './style.css';
import Lib from '../../../Lib';

import ModalLancarData from '../../../Components/ModalLancarData';

class ComissaoVendedor extends Component {

    constructor(props){
        super(props);
        this.state = {
            empresa: {},
            vendedores: [],
            periodo: {
                inicio: '',
                fim: ''
            },
            showFormData : false
        }
    }
    
    async carregar(inicio,fim){

        try {
            const response = await api.get(`res_comissao_vendedor?inicio=${inicio}&fim=${fim}`, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            })

            if (response.data.vendedores) this.setState({vendedores: response.data.vendedores})
            if (response.data.empresa) this.setState({empresa: response.data.empresa})

            this.setState({showFormData: false});
            this.setState({periodo: {inicio,fim}});
        } catch (error) {
            alert(error)
            localStorage.clear();
            window.location.reload();
        }
    }

    render(){
        return (<>
            <ModalLancarData 
                show={this.state.showFormData}
                onHide={(inicio,fim) => {
                    this.carregar(inicio,fim)
                }}
            />
            <div className="container" id="relatorio_comissao_vendedor">
                <h1 style={{textAlign: 'center'}}>{this.state.empresa.nome}</h1>
                <h4 style={{textAlign: 'center'}}>Relatório de comissão por vendedor</h4>
                <h5 style={{marginTop: '30px'}}>Período: {Lib.getDataString(this.state.periodo.inicio)} até {Lib.getDataString(this.state.periodo.fim)}</h5>
                <table style={{width: '100%'}}>
                    <thead>
                        <tr>
                            <th>Nome do vendedor</th>
                            <th>Comissão (%)</th>
                            <th>Quantidade de vendas</th>
                            <th>Valor total vendido</th>
                            <th>Comissão do vendedor (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.vendedores.map(item => (
                            <tr key={item.id_vendedor}>
                                <td>{item.nome_vendedor}</td>
                                <td>{item.comissao}%</td>
                                <td>{item.total_vendas}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.total_ventido)}</td>
                                <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.total_comissao)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div id="botoes">
                    <Button className="btn-danger mr-2" onClick={() => window.history.back()}>Voltar</Button>
                    <Button className="btn-warning mr-2" onClick={() => this.setState({showFormData: true})}>Nova Consulta</Button>
                    <Button onClick={() => {
                        document.getElementById('botoes').style.display = 'none';
                        window.print();
                        document.getElementById('botoes').style.display = 'flex';
                    }}>Imprimir</Button>
                </div>  
            </div>
        </>);
    }

}

export default ComissaoVendedor;