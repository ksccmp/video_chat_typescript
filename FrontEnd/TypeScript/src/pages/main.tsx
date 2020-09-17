import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../modules/reducer/index';
import { Iuser } from '../api/interface';
import { RouteComponentProps, Route, Switch } from 'react-router';
import { StyledNav1, StyledNavUl1, StyledNavLi1, StyledNavLink1 } from '../api/styled';
import Home from './main/home';
import Intro from './main/intro';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '0.8fr 11.2fr',
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
                        <StyledNavLi1 select={match.params.target === 'right' ? true : false}>
                            <StyledNavLink1 to="#">Right</StyledNavLink1>
                        </StyledNavLi1>
                    </StyledNavUl1>
                </StyledNav1>
                <Switch>
                    <Route path="/main/home" component={Home}></Route>
                    <Route path="/main/intro" component={Intro}></Route>
                </Switch>
            </div>
        </>
    );
};

export default main;
