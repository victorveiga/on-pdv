import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioCliente from './FormularioCliente';

class JanelaCliente extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            Clientes: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getClientes(page=1, texto_search=''){
        const response = await api.get(`cliente?page=${page}`, {headers: {
            authorization: 'Bearer '+localStorage.getItem('auth-token'),
            search: texto_search
        }});

        this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
        this.setState({activePage: page })

        this.setState({Clientes: response.data});
        this.setState({content: this.handleSelecao()})
    }

    handleSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Nome do Cliente', 'CPF', 'Whatsapp']}
                CamposSelecao={['id', 'nome', 'cpf', 'whatsapp']}
                DataSelecao={this.state.Clientes}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={(data) => {this.handleFormulario(this,data)}}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getClientes(page,search)}}
            />
        );
    }

    handleFormulario(classe, data){
        classe.setState ({content:
            <FormularioCliente
                cancelar={classe.renderSelecao}
                dados={data}
                carregar={(page) => {this.getClientes(page)}}
            />
        });    
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getClientes()}}
                content={this.state.content}
                titulo={"Clientes"}
            />
        );
    }  
}

export default JanelaCliente;