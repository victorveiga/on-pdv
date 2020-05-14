import React, { Component } from 'react';
import { Modal , Button} from 'react-bootstrap';
import Lib from '../Lib';

class ModalLancarDataValor extends Component {

    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            valor: 0,
            dataPagamento: Lib.getDataStringYMD(new Date())
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
                    <div>
                        <div>Data de pagamento</div>
                        <input 
                            className={`form-control ${this.state.inicio_status}`} 
                            type="date" 
                            value={this.state.dataPagamento} 
                            onChange={(e) => this.setState({dataPagamento: e.target.value})} 
                            required
                        />
                    </div>
                    <div>
                        <div>Valor Pago</div>
                        <input 
                            className="form-control" 
                            type="number" 
                            value={this.state.valor} 
                            onChange={(e) => this.setState({valor: e.target.value})}
                        />
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success" onClick={() => {
                        this.props.duplicata.pagamento  = this.state.dataPagamento;
                        this.props.duplicata.valor_pago = this.state.valor;
                        this.props.onHide(this.props.duplicata);
                    }}>Confirmar</Button>
                    <Button className="btn-danger" onClick={() => this.props.onHide() }>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalLancarDataValor;