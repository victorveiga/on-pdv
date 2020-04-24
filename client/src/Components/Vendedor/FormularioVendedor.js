import React, { Component } from 'react';
import api from '../../services/api';

class FormularioVendedor extends Component {

    constructor(props){
        super(props);
        if (!props.dados){
            this.state = {
                id: null,
                codigo: '',
                referencia: '',
                descricao: '',
                preco: '',
                desconto: '',
                NCM: '',
                CEST: ''
            }
        } else {
            this.state = {
                id: props.dados.id,
                codigo: props.dados.codigoBarras,
                referencia: props.dados.codigoReferencia,
                descricao: props.dados.nome,
                preco: props.dados.preco,
                desconto: props.dados.descontoMaximo,
                NCM: props.dados.ncm,
                CEST: props.dados.cest
            }
        }
        
    }

    async handleSave(e){
        e.preventDefault();

        const dados = {
            codigoBarras     : this.state.codigo,
            codigoReferencia : this.state.referencia,
            nome             : this.state.descricao,
            preco            : this.state.preco,
            descontoMaximo   : this.state.desconto,
            ncm              : this.state.NCM,
            cest             : this.state.CEST
        }

        let response = null;

        if (this.state.id > 0){  
            response = await api.put(`produto/${this.state.id}`, dados , {
                headers: {
                    authorization: 'Bearer '+localStorage.getItem('auth-token')
                }
            });  
        } else {
            response = await api.post(`produto`, dados);
        }

        if (response){
            this.props.carregar();
        }

    }

    render(){
        return (
            <div>
                Tem que criar
            </div>
        );
    }
}

export default FormularioVendedor;