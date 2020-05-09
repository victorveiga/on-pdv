import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './style.css';
import Lib from '../../../Lib';

class Fechamento extends Component {
    constructor(props){
        super(props);

        this.state = {
            empresa: {},
            vendedores: [],
            periodo: {
                inicio: '',
                fim: ''
            }
        }
    }

    componentDidMount(){

    }

    render(){
        return (<>
            <div className="container" id="relatorio_fechamento_caixa">
                <h1 style={{textAlign: 'center'}}>{this.state.empresa.nome}</h1>
                <h4 style={{textAlign: 'center'}}>Relatório de controle de caixa</h4>
                <h5 style={{marginTop: '30px'}}>Período: {Lib.getDataString(this.state.periodo.inicio)} até {Lib.getDataString(this.state.periodo.fim)}</h5>
                <table style={{width: '100%'}}>
                    <thead>
                       
                    </thead>
                    <tbody>

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

export default Fechamento;