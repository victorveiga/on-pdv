import React, { Component } from 'react';
import { Modal , Button} from 'react-bootstrap';

class ModalLancarValor extends Component {

    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            valor: 1
        }
    }

    render(){
        return (
            <Modal
                show={this.props.show}
                size="sm"
                aria-labelledby="modal-editar-valor"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="modal-editar-valor">Lançar Valor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className="form-control" type="number" value={this.state.valor} onChange={(e) => this.setState({valor: e.target.value})}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success" onClick={() => this.props.onHide(this.props.ItemId,this.state.valor)}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalLancarValor;