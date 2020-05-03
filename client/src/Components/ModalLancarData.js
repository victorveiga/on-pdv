import React, { Component } from 'react';
import { Modal , Button} from 'react-bootstrap';

class ModalLancarValor extends Component {

    constructor(props){
        super(props);
        this.props = props;

        this.state = {
            inicio: '',
            fim: '',
            inicio_status: '',
            fim_status: ''
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
                        <Modal.Title id="modal-editar-valor">Informe o Periodor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div>Inicio</div>
                            <input className={`form-control ${this.state.inicio_status}`} type="date" value={this.state.inicio} onChange={(e) => this.setState({inicio: e.target.value})} required/>
                        </div>
                        <div>
                            <div>Fim</div>
                            <input className={`form-control ${this.state.fim_status}`} type="date" value={this.state.fim} onChange={(e) => this.setState({fim: e.target.value})} required/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" className="btn-success" onClick={() => {
                            
                            if (!this.state.inicio){
                                this.setState({inicio_status: 'is-invalid'})
                                return
                            } else {
                                this.setState({inicio_status: 'is-valid'})
                            }
                    
                            if(!this.state.fim){
                                this.setState({fim_status: 'is-invalid'})
                                return
                            } else {
                                this.setState({fim_status: 'is-valid'})
                            }

                            
                            this.props.onHide(this.state.inicio, this.state.fim);
                            
                        }}>Confirmar</Button>
                    </Modal.Footer>
                </Modal>  
        );
    }
}

export default ModalLancarValor;