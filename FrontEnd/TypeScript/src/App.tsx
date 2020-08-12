import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from './modules/reducer/index';
import { userSelectByUserTokenAction } from './modules/actions';

const App: React.FC = () => {
    const dispatch = useDispatch();

    const reduxIsSignIn: boolean = useSelector((state: reducerState) => state.user.isSignIn);

    useEffect(() => {
        if (reduxIsSignIn === false && localStorage.userToken) {
            dispatch(userSelectByUserTokenAction());
        }
    });

    return (
        <>
            {reduxIsSignIn ? <Redirect to="/main" /> : <Redirect to="/user/signIn" />}
            <Switch>
                <Route path="/user/signIn" component={SignIn} />
                <Route path="/user/signUp" component={SignUp} />
                <Route path="/main" component={Main} />
            </Switch>
        </>
    );
};

export default App;
