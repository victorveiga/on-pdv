import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Orcamento from './pages/Orcamento';
import Home from './pages/Home';
import {isAuthenticated} from './Auth';

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
            </Switch>
        </BrowserRouter>
    );
}