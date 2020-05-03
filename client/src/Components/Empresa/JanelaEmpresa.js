import React, {Component} from 'react';
import JanelaModal from '../JanelaModal';
import FormularioEmpresa from './FormularioEmpresa';
import api from '../../services/api';

class JanelaProduto extends Component {

    constructor(props){
        super(props);

        this.state = {
            content: null,
            dados: null
        }

    }

    async carregarDados(){
        
        try {
            const response = await api.get(`empresa`, {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });
    
            let aux_dados = null;

            if (response.data){
                if (response.data[0])
                    aux_dados = response.data[0];
                else
                    aux_dados = response.data;

                this.setState({dados: aux_dados})
            }
        } catch (error) {
            alert(error)
            localStorage.clear()
            window.location.reload();
        }
    }

    montarFormulario(){
        return (
            <FormularioEmpresa
                dados={this.state.dados}
                voltar={()=> this.props.onHide()}
            />
        );
    }

    componentDidMount(){
        this.renderizar()
    }

    async renderizar(){
        await this.carregarDados()
        this.setState({content: this.montarFormulario()})
    }

    render(){
        return (
            <JanelaModal
                {...this.props}
                content={this.state.content}
                titulo={"Empresa"}
            />
        );
    }  
}

export default JanelaProduto;