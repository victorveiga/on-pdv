import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from './Auth';

// páginas:
import Logon from './pages/Logon';
import Register from './pages/Register';
import Orcamento from './pages/Orcamento';
import Home from './pages/Home';
import RelatorioVenda from './pages/RelatorioVenda';
import ComissaoVendedor from './pages/Relatorios/ComissaoVendedor';
import FechamentoCaixa from './pages/Relatorios/Fechamento';
import Venda from './pages/Venda';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => 
        isAuthenticated()? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
        )
    }
    />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Logon} />  
                <Route path="/register" component={Register} />
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute path='/orcamento' component={Orcamento} />
                <PrivateRoute path='/relatorio-venda/:venda' component={RelatorioVenda}/>
                <PrivateRoute path='/comissao_vendedor' component={ComissaoVendedor}/>
                <PrivateRoute patch='/fechamento_caixa' component={FechamentoCaixa}/>
                <PrivateRoute path='/venda' component={Venda}/>
            </Switch>
        </BrowserRouter>
    );
}