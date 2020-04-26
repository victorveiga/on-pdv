import React from 'react';
import {Modal, Button} from 'react-bootstrap/';

import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';

export default function JanelaModal(props) {

    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="modal-cadastro"
        centered
      >
        <ModalHeader closeButton>
          <ModalTitle id="modal-cadastro">
            Cadastro de {props.titulo}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {props.content}
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onHide}>Fechar</Button>
        </ModalFooter>
      </Modal>
    );

}