import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import Selecao from '../Selecao';
import api from '../../services/api';
import Lib from '../../Lib';

class JanelaOrcamento extends Component {

    constructor(props){
        super(props);

        // Formulário para resgatar um registro
        this.selecionarRegistro = props.selecionarRegistro;

        this.state = {
            content: null,
            Orcamentos: null,
            activePage: 1,
            maxPage: 1
        }
    }

    async getOrcamentos(page=1, texto_search=''){

        try {
            const response = await api.get(`orcamento?page=${page}`, {headers: {
                authorization: 'Bearer '+localStorage.getItem('auth-token'),
                search: texto_search
            }});

            response.data.map(item => (
                item.dataOperacao = Lib.getDataString(item.dataOperacao)
            ))

            this.setState({maxPage: Math.ceil(response.headers['total'] / 5)  })
            this.setState({activePage: page })

            this.setState({Orcamentos: response.data});
            this.setState({content: this.handleSelecao()})
        } catch(err){
            alert(err)
            localStorage.clear()
            window.location.reload();
        } 
    }

    handleSelecao(){

        return (
            <Selecao
                NomesCamposSelecao={['#', 'Data', 'Número', 'Total']}
                CamposSelecao={['id', 'dataOperacao', 'numero', 'totalLiquido']}
                DataSelecao={this.state.Orcamentos}
                formularioEditar={this.selecionarRegistro}
                maxPage={this.state.maxPage}
                activePage={this.state.activePage}
                carregar={(page, search) => {this.getOrcamentos(page,search)}}
            />
        );
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                onShow={() => {this.getOrcamentos()}}
                content={this.state.content}
                titulo={"Orçamentos"}
            />
        );
    }  
}

export default JanelaOrcamento;