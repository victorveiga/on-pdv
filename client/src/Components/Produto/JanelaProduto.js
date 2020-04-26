import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioProduto from './FormularioProduto';

class JanelaProduto extends Component {

    constructor(props){
        super(props);

        // Formulário para resgatar um registro
        this.selecionarRegistro = props.selecionarRegistro;

        this.state = {
            content: null,
            produtos: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getProdutos(page=1, texto_search=''){
        
        const response = await api.get(`produto?page=${page}`, {headers: {
            authorization: 'Bearer '+localStorage.getItem('auth-token'),
            search: texto_search
        }});

        this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
        this.setState({activePage: page })

        this.setState({produtos: response.data});
        this.setState({content: this.handleSelecao()})
    }

    handleSelecao(){
        // Formulário para editar o registro
        const formularioEditar = (data) => {this.handleFormulario(this,data)}

        return (
            <Selecao
                NomesCamposSelecao={['#', 'Código', 'Descrição', 'Preço']}
                CamposSelecao={['id', 'codigoBarras', 'nome', 'preco']}
                DataSelecao={this.state.produtos}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={this.selecionarRegistro?this.selecionarRegistro:formularioEditar}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getProdutos(page,search)}}
            />
        );
    }

    handleFormulario(classe, data){
        classe.setState ({content:
            <FormularioProduto
            cancelar={classe.renderSelecao}
            dados={data}
            carregar={(page) => {this.getProdutos(page)}}
            />
        });    
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getProdutos()}}
                content={this.state.content}
                titulo={"Produtos"}
            />
        );
    }  
}

export default JanelaProduto;