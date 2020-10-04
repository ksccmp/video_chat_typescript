import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import SignIn from './sign/signIn';
import SignUp from './sign/signUp';
import Search from './sign/search';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '1fr 2fr 1fr',
    height: '100%',
};

const div2: React.CSSProperties = {
    backgroundColor: '#ece5da',
    display: 'table',
    height: '100%',
    width: '100%',
};

const div3: React.CSSProperties = {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
};

interface Iuser {
    target: string;
}

const user: React.FC<RouteComponentProps<Iuser>> = ({ match }) => {
    return (
        <>
            <div style={div1}>
                <header></header>

                <div style={div2}>
                    <div style={div3}>
                        <Switch>
                            <Route path="/user/signIn" component={SignIn}></Route>
                            <Route path="/user/signUp" component={SignUp}></Route>
                            <Route path="/user/search" component={Search}></Route>
                        </Switch>
                    </div>
                </div>

                <footer></footer>
            </div>
        </>
    );
};

export default user;
