import React from 'react';
import {Modal, Button} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function JanelaModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastro de {props.titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.content}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
}