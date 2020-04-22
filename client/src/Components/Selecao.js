import React from 'react';
import {Button, Table, Form} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Selecao.css';

export default function Selecao(props){

    const {NomesCamposSelecao, CamposSelecao, DataSelecao, montarFormulario} = props;

    return (
        <div>
          <Form className="form-inline mb-2">
            <input className="form-control" type="text" placeholder="Pesquise aqui"/>
            <Button className="ml-2" variant={"outline-dark"}>Pesquisar</Button>
            <Button className="ml-2" variant={"outline-dark"} onClick={montarFormulario}>Criar Novo</Button>
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

            <nav aria-label="Navegação de página exemplo">
              <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">Anterior</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Próximo</a>
                </li>
              </ul>
            </nav>
          </div>
      );
}