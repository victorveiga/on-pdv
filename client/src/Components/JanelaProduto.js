import React, { useState , useEffect} from 'react';
import api from '../services/api';
import Selecao from './Selecao';
import JanelaModal from './JanelaModal';

export default function JanelaProduto(props) {

    const [produtos, setProdutos] = useState([]);

    async function handleProdutos(){
        const response = await api.get('produto');
        setProdutos(response.data);
    }

    function montarSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Código', 'Descrição', 'Preço']}
                CamposSelecao={['id', 'codigoBarras', 'nome', 'preco']}
                DataSelecao={produtos}
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