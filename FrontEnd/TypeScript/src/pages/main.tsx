import * as React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { StyledNav1, StyledNavUl1, StyledNavLi1, StyledNavLink1 } from '../api/styled';
import Home from './main/home';
import Intro from './main/intro';
import Usage from './main/usage';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '0.7fr 11.3fr',
    width: '100%',
    height: '100%',
};

interface Imain {
    target: string;
}

const main: React.FC<RouteComponentProps<Imain>> = ({ match }) => {
    return (
        <>
            <div style={div1}>
                <StyledNav1>
                    <StyledNavUl1>
                        <StyledNavLi1 select={match.params.target === 'intro' ? true : false}>
                            <StyledNavLink1 to="/main/intro">Intro</StyledNavLink1>
                        </StyledNavLi1>
                        <StyledNavLi1 select={match.params.target === 'home' ? true : false}>
                            <StyledNavLink1 to="/main/home">Home</StyledNavLink1>
                        </StyledNavLi1>
                        <StyledNavLi1 select={match.params.target === 'usage' ? true : false}>
                            <StyledNavLink1 to="/main/usage">Usage</StyledNavLink1>
                        </StyledNavLi1>
                    </StyledNavUl1>
                </StyledNav1>
                <Switch>
                    <Route path="/main/home" component={Home}></Route>
                    <Route path="/main/intro" component={Intro}></Route>
                    <Route path="/main/usage" component={Usage}></Route>
                </Switch>
            </div>
        </>
    );
};

export default main;
