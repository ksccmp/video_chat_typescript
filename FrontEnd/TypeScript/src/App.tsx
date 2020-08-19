import React, { useEffect } from 'react';
import { Route, Redirect, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import Chat from './pages/socket/chat';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from './modules/reducer/index';
import { userSelectByUserTokenAction } from './modules/actions';

const App: React.FC<RouteComponentProps> = ({ history }) => {
    const dispatch = useDispatch();

    const reduxIsSignIn: boolean = useSelector((state: reducerState) => state.user.isSignIn);

    useEffect(() => {
        if (reduxIsSignIn === false && localStorage.userToken) {
            dispatch(userSelectByUserTokenAction());
        } else if (!localStorage.userToken) {
            history.push('/user/signIn');
        } else if (reduxIsSignIn === true) {
            history.push('/main');
        }
    }, []);

    return (
        <>
            <Switch>
                <Route path="/user/signIn" component={SignIn} />
                <Route path="/user/signUp" component={SignUp} />
                <Route path="/main" component={Main} />
                <Route path="/socket/chat/:roomId/:userId" component={Chat} />
            </Switch>
        </>
    );
};

export default withRouter(App);
