import React, { Component } from 'react';
import api from '../../services/api';
import {Button} from 'react-bootstrap';
import './index.css';
import Lib from '../../Lib';

class RelatorioVenda extends Component {

    constructor(props){
        super(props);
        this.state = {
            venda: {
                cpf_cliente: "",
                dataOperacao: "",
                end_telefone: "",
                id: 0,
                idCliente: 0,
                idVendedor: 0,
                nome_cliente: "",
                nome_vendedor: "",
                numero: "",
                serie: "",
                totalBruto: "",
                totalDesconto: "",
                totalLiquido: ""
            },
            itens: [],
            content: null
        }
    }

    async getDados(){
        try {
            const response = await api.get(`venda/${this.props.match.params.venda}`, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            })

            let aux_venda = null;
            if (response.data.venda) {
                if (response.data.venda[0]){
                    aux_venda = response.data.venda[0]
                } else {
                    aux_venda = response.data.venda 
                }
            }
            this.setState({itens: response.data.itens})

            if (aux_venda) this.setState({venda: aux_venda})
        } catch (error) {
            alert(error)
            localStorage.clear();
            window.location.reload();
        }
    }

    async renderizar(){
        await this.getDados();
        this.setState({content: this.montarRelatorio()})
    }

    componentDidMount(){
        this.renderizar();
    }

    montarRelatorio(){
        return (
            <div className="container">
                <div id="relatorio_venda-principal">
                    <div id="cabecalho">
                        <div>DAV - DOCUMENTO AUXILIAR DE VENDA</div>
                        <div>NÃO É DOCUMENTO FISCAL - NÃO É VÁLIDO COMO RECIBO</div>
                        <div>E GARANTIA DE MERCADORIA - NÃO COMPROVA PAGAMENTO</div>
                    </div>
                    <div id="emitente" style={{marginTop: '5px', width: '100%'}}>
                        <div style={{borderBottom: '1px solid #2f353b'}}>Identificação do Estabelecimento - Emitente</div>
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <td colSpan={3}>Razão Social: <span className="dado">Mercearia de teste ltda</span></td>
                                    <td colSpan={3}>CNPJ: <span className="dado">{'57.937.154/0001-21'}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>Data de Operação: <span className="dado">{Lib.getDataString(this.state.venda.dataOperacao)}</span></td>
                                    <td className="td_completar">Vendedor: <span className="dado">{this.state.venda.nome_vendedor}</span></td>
                                    <td className="td_completar">Telefone do Vendedor: <span className="dado">{this.state.venda.end_telefone}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="destinatario" style={{marginTop: '5px', width: '100%'}}>
                        <div style={{borderBottom: '1px solid #2f353b'}}>Identificação do Comprador - Destinatário</div>
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <td colSpan={3}>Nome: <span className="dado">{this.state.venda.nome_cliente}</span></td>
                                    <td colSpan={3}>CPF/CNPJ: <span className="dado">{this.state.venda.cpf_cliente}</span></td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>Número: <span className="dado">{this.state.venda.id}</span></td>
                                    <td className="td_completar">Número do documento fiscal: <span className="dado"></span></td>
                                </tr>
                            </tbody>    
                        </table>
                    </div>

                    <div id="itens" style={{marginTop: '5px', width: '100%'}}>
                        <table style={{width: '100%'}}>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição do produto</th>
                                    <th>Qtde</th>
                                    <th>Unid.</th>
                                    <th>Valor</th>
                                    <th>Desconto (%)</th>
                                    <th>Total (R$)</th>
                                </tr>                                
                            </thead>
                            <tbody>
                                {this.state.itens.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.codigoBarras}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.quantidade}</td>
                                        <td>UN</td>
                                        <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.preco)}</td>
                                        <td>{item.desconto}%</td>
                                        <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(((item.preco - (item.preco * (item.desconto / 100 ))) * item.quantidade))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div id="quadro_totais" style={{marginTop: '5px'}}>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Subtotal: </td>
                                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.venda.totalBruto)}</td>
                                </tr>
                                <tr>
                                    <td style={{width: '1000px', fontWeight: 'bold'}}>Desconto: </td>
                                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.venda.totalDesconto)}</td>
                                </tr>
                                <tr>
                                    <td style={{fontWeight: 'bold'}}>Total: </td>
                                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(this.state.venda.totalLiquido)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div id="area_observacao" style={{marginTop: '5px'}}>
                        <div style={{fontWeight: 'bold', borderBottom: '1px solid #2f353b'}}>Identificação do Equipamento:</div>
                        <div style={{fontWeight: 'normal', textAlign: 'start', borderBottom: '1px solid #2f353b'}}>Número de série: 123456</div>
                        <div style={{height: '200px', borderBottom: '1px solid #2f353b'}}></div>
                        <div style={{fontWeight: 'bold'}}>É vedada a autenticação deste documento</div>
                    </div>
                    <div id="botoes">
                        <Button className="btn-danger mr-2" onClick={() => window.history.back()}>Voltar</Button>
                        <Button onClick={() => {
                            document.getElementById('botoes').style.display = 'none';
                            window.print();
                            document.getElementById('botoes').style.display = 'flex';
                        }}>Imprimir</Button>
                    </div>  
                </div>
            </div>
        );
    }

    render(){
        return <>
            {this.state.content}
         </>
    }
}

export default RelatorioVenda;