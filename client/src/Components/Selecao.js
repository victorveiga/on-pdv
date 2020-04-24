import React, { useState } from 'react';
import {Button, Table, Form, Pagination} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Selecao.css';

export default function Selecao(props){

    const [pesquisa, setPesquisa] = useState('');

    let tabela_selecao_thead_key=0;
    let tabela_selecao_tbody_td_key=0;

    const {
        NomesCamposSelecao, 
        CamposSelecao, 
        DataSelecao, 
        formularioNovo, 
        formularioEditar,
        maxPage,
        activePage,
        carregar
    } = props;

    function handlePaginacao(){
        let items = [];
        for (let number = 1; number <= maxPage; number++) {
          items.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => {carregar(number)}}>
              {number}
            </Pagination.Item>,
          );
        }

        return (
          <Pagination className="justify-content-center">{items}</Pagination>
        );
    }

    return (
        <div>
          <Form className="form-inline mb-2">
            <input 
                className="form-control" 
                type="text" 
                placeholder="Pesquise aqui"
                value={pesquisa}
                onChange={e => setPesquisa(e.target.value)}
            />
            <Button className="ml-2" variant={"outline-dark"} onClick={() => {carregar(1, pesquisa)}}>Pesquisar</Button>
            <Button className="ml-2" variant={"outline-dark"} onClick={formularioNovo}>Criar Novo</Button>
          </Form>

          <Table striped={true} id={"tabela_selecao"}>
              <thead>
                    <tr>
                        {NomesCamposSelecao.map(campo => (
                            <th key={++tabela_selecao_thead_key}>{campo}</th>
                        ))}
                    </tr>
              </thead>
              <tbody>
                {DataSelecao.map(data => (
                  <tr key={data['id']} className="textoSemSelecao" onClick={()=> {formularioEditar(data)}}>
                    {CamposSelecao.map(campo => (
                        <td key={tabela_selecao_tbody_td_key++}>{data[campo]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>

            {handlePaginacao()}
          </div>
      );
}