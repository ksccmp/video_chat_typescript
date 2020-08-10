import React from 'react';
import { Route, Redirect, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

const App: React.FC<RouteComponentProps> = ({ history }) => {
    return (
        <>
            <Switch>
                <Route path="/user/signIn" component={SignIn} />
                <Route path="/user/signUp" component={SignUp} />
                <Redirect to="/user/signIn" />
            </Switch>
        </>
    );
};

export default withRouter(App);
