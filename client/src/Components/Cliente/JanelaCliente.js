import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioCliente from './FormularioCliente';
import { useHistory } from 'react-router-dom';

class JanelaCliente extends Component {

    constructor(props){
        super(props);

        // Formulário para resgatar um registro
        this.selecionarRegistro = props.selecionarRegistro;

        this.state = {
            content: null,
            Clientes: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getClientes(page=1, texto_search=''){
        try {
            const response = await api.get(`cliente?page=${page}`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token'),
                search: texto_search
            }});

            this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
            this.setState({activePage: page })

            this.setState({Clientes: response.data});
            this.setState({content: this.handleSelecao()})
        } catch(err){
            alert(err)
            localStorage.clear();
            useHistory().push('/');
        }
    }

    handleSelecao(){
        // Formulário para editar o registro
        const formularioEditar = (data) => {this.handleFormulario(this,data)}

        return (
            <Selecao
                NomesCamposSelecao={['#', 'Nome do Cliente', 'CPF', 'Whatsapp']}
                CamposSelecao={['id', 'nome', 'cpf', 'whatsapp']}
                DataSelecao={this.state.Clientes}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={this.selecionarRegistro?this.selecionarRegistro:formularioEditar}
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