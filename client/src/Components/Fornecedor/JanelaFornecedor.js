import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioFornecedor from './FormularioFornecedor';

class JanelaFornecedor extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            Fornecedores: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getFornecedores(page=1, texto_search=''){
        try {
            const response = await api.get(`fornecedor?page=${page}`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token'),
                search: texto_search
            }});

            this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
            this.setState({activePage: page })

            this.setState({Fornecedores: response.data});
            this.setState({content: this.handleSelecao()})
        } catch(err){
            alert(err)
            localStorage.clear();
            window.location.reload();
        }
    }

    handleSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Nome do Fornecedores', 'Insc. Estadual']}
                CamposSelecao={['id', 'nome', 'insricaoEstadual']}
                DataSelecao={this.state.Fornecedores}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={(data) => {this.handleFormulario(this,data)}}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getFornecedores(page,search)}}
            />
        );
    }

    handleFormulario(classe, data){
        classe.setState ({content:
            <FormularioFornecedor
                cancelar={classe.renderSelecao}
                dados={data}
                carregar={(page) => {this.getFornecedores(page)}}
            />
        });    
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getFornecedores()}}
                content={this.state.content}
                titulo={"Fornecedores"}
            />
        );
    }  
}

export default JanelaFornecedor;