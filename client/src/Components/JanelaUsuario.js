import React, { useState , useEffect} from 'react';
import api from '../services/api';
import Selecao from './Selecao';
import JanelaModal from './JanelaModal';

export default function JanelaUsuario(props){

    const [usuarios,setUsuarios] = useState([]);

    async function handleUsuario(){
        const response = await api.get('usuario');
        setUsuarios(response.data)
    }

    function montarSelecao(){
        return (
            <Selecao
                NomesCamposSelecao={['#', 'Nome', 'E-mail']}
                CamposSelecao={['id', 'nome', 'email']}
                DataSelecao={usuarios}
            />
        );
    }

    return (
        <JanelaModal
            {...props}
            onShow={handleUsuario}
            Titulo={"Usuários"}
            montarSelecao={montarSelecao}
        />
    );
}