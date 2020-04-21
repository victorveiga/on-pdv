import React from 'react';
import {Button, Table, Form} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Selecao.css';

export default function Selecao(props){

    const {NomesCamposSelecao, CamposSelecao, DataSelecao} = props;

    return (
        <div>
          <Form className="form-inline mb-2">
            <input className="form-control" type="text" placeholder="Pesquise aqui"/>
            <Button className="ml-2" variant={"outline-dark"}>Pesquisar</Button>
          </Form>

          <Table striped={true} id={"tabela_selecao"}>
              <thead>
                    <tr>
                        {NomesCamposSelecao.map(campo => (
                            <th>{campo}</th>
                        ))}
                    </tr>
              </thead>
              <tbody>
                {DataSelecao.map(data => (
                  <tr className="textoSemSelecao">
                    {CamposSelecao.map(campo => (
                        <td>{data[campo]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
      );
}