import React, { useEffect } from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import Main from './pages/main';
import User from './pages/user';
import SocketHome from './pages/socket/socketHome';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from './modules/reducer/index';
import { userSelectByUserTokenAction } from './modules/actions';
import Alert from './common/alert';

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
                <Route path="/user/:target" component={User} />
                <Route path="/main/:target" component={Main} />
                <Route path="/socket/chat/:roomId/:userId" component={SocketHome} />
            </Switch>

            <Alert />
        </>
    );
};

export default withRouter(App);
