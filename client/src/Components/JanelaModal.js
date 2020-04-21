import React, { useState , useEffect} from 'react';
import {Modal, Button, Table, Form} from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../services/api';

export default function JanelaModal(props) {

    const {Titulo, montarSelecao} = props;

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastro de {Titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {montarSelecao()}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}