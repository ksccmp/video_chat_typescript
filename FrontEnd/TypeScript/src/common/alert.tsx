import * as React from 'react';
import styled from 'styled-components';
import { StyledButton5, StyledH3, StyledH4 } from '../api/styled';
import { IopenAlertModal } from '../api/interface';
import { useDispatch, useSelector } from 'react-redux';
import { reducerState } from '../modules/reducer';
import { commonResetOpenAlertModalAction } from '../modules/actions';

interface Ialert {
    open: boolean;
}

const Div1 = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    transition: all 1s cubic-bezier(0.6, 0.3, 0.5, 1);
    top: ${(props: Ialert) => (props.open ? '0' : '-100%')};
    background-color: ${(props: Ialert) => (props.open ? 'rgba(0, 0, 0, 0.3)' : '')};
`;

const Div2 = styled.div`
    width: 25rem;
    height: 10rem;
    margin: 0 auto;
    border: 1px solid black;
    background-color: #f2ede4;
    display: grid;
    grid-template-rows: 1.5fr 1fr;
`;

const Div3 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Alert = () => {
    const dispatch = useDispatch();

    const openAlertModal: IopenAlertModal = useSelector((state: reducerState) => state.common.openAlertModal);

    const click = () => {
        dispatch(commonResetOpenAlertModalAction());
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(commonResetOpenAlertModalAction());
        }, [5000]);
        return () => clearTimeout(timer);
    }, [openAlertModal]);

    return (
        <Div1 open={openAlertModal.open}>
            <Div2 onClick={click}>
                <Div3>
                    <StyledH3>{openAlertModal.contents}</StyledH3>
                </Div3>
                <Div3>
                    <StyledButton5 onClick={click}>
                        <StyledH4>확인</StyledH4>
                    </StyledButton5>
                </Div3>
            </Div2>
        </Div1>
    );
};

export default Alert;
