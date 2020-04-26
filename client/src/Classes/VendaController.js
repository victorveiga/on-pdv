import React from 'react';
import {FaEdit} from 'react-icons/fa';
import Venda from './Venda';

class VendaController extends Venda {

    constructor(alterarQuantidade, alterarDesconto){
        super();
        this.alterarQuantidade = alterarQuantidade;
        this.alterarDesconto   = alterarDesconto;
    }
    
    getLinhas(){
        return (<>

            {this.xItems.map(item => (
                <tr key={item.getIdentificador()}>
                    <td>{item.getCodigoBarras()}</td>
                    <td>{item.getNome()        }</td>
                    <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.getPreco())}</td>
                    <td>
                        <span className="mr-2" style={{cursor: "pointer"}} onClick={() => this.alterarQuantidade(item.getIdentificador())}><FaEdit size={25}/></span>
                        {item.getQuantidade()}
                    </td>
                    <td>
                        <span className="mr-2" style={{cursor: "pointer"}} onClick={() => this.alterarDesconto(item.getIdentificador())}><FaEdit size={25}/></span>
                        {item.getDesconto()}
                    </td>
                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.getPreco() * item.getQuantidade())}</td>
                    <td>{Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.getTotalItem())}</td>
                </tr>
            ))}

        </>);
    }
}

export default VendaController;