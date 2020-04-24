import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioVendedor from './FormularioVendedor';

class JanelaVendedor extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            Vendedores: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getVendedores(page=1, texto_search=''){
        const response = await api.get(`vendedor?page=${page}`, {headers: {
            authorization: 'Bearer '+localStorage.getItem('auth-token'),
            search: texto_search
        }});

        this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
        this.setState({activePage: page })

        this.setState({Vendedores: response.data});
        this.setState({content: this.handleSelecao()})
    }

    handleSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Nome do Vendedor', 'E-mail']}
                CamposSelecao={['id', 'nome', 'email']}
                DataSelecao={this.state.Vendedores}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={(data) => {this.handleFormulario(this,data)}}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getVendedores(page,search)}}
            />
        );
    }

    handleFormulario(classe, data){
        classe.setState ({content:
            <FormularioVendedor
                cancelar={classe.renderSelecao}
                dados={data}
                carregar={(page) => {this.getVendedores(page)}}
            />
        });    
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getVendedores()}}
                content={this.state.content}
                titulo={"Vendedores"}
            />
        );
    }  
}

export default JanelaVendedor;