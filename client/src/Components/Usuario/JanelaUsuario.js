import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import FormularioUsuario from './FormularioUsuario';

class JanelaUsuario extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            usuarios: null,
            activePage: 1,
            maxPage: 1
        }

        this.renderSelecao = () => { this.setState({content: this.handleSelecao()}) };
    }

    async getUsuarios(page=1, texto_search=''){
        try {
            const response = await api.get(`usuario?page=${page}`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token'),
                search: texto_search
            }});

            this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
            this.setState({activePage: page })

            this.setState({usuarios: response.data});
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
                NomesCamposSelecao={['#', 'Nome', 'Nome de Usuário', 'E-mail']}
                CamposSelecao={['id', 'nome', 'nomeUsuario', 'email']}
                DataSelecao={this.state.usuarios}
                formularioNovo={() => {this.handleFormulario(this)}}
                formularioEditar={(data) => {this.handleFormulario(this,data)}}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getUsuarios(page,search)}}
            />
        );
    }

    handleFormulario(classe, data){
        classe.setState ({content:
            <FormularioUsuario
                cancelar={classe.renderSelecao}
                dados={data}
                carregar={(page) => {this.getUsuarios(page)}}
            />
        });    
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getUsuarios()}}
                content={this.state.content}
                titulo={"Usuarios"}
            />
        );
    }  
}

export default JanelaUsuario;