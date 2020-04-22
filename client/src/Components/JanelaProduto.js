import React, { useState , useEffect} from 'react';
import api from '../services/api';
import Selecao from './Selecao';
import JanelaModal from './JanelaModal';

export default function JanelaProduto(props) {

    const [produtos, setProdutos] = useState([]);
    const [page, setPage] = useState(1);
    let qtde = 0;

    async function handleProdutos(){
        const response = await api.get(`produto?page=${page}`);
        console.log(response.headers['count']);
        console.log(response);
        setProdutos(response.data);
    }

    function montarFormulario(data){
        return (
            <div>
                <span>
                    Eu sou um formulario
                </span>
            </div>
        );
    }

    function montarSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Código', 'Descrição', 'Preço']}
                CamposSelecao={['id', 'codigoBarras', 'nome', 'preco']}
                DataSelecao={produtos}
                montarFormulario={montarFormulario}
            />
        );
    }

    return (
        <JanelaModal
            {...props}
            onShow={handleProdutos}
            Titulo={"Produtos"}
            montarSelecao={montarSelecao}
        />
    );
}