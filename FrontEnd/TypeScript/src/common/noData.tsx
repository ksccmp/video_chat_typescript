import * as React from 'react';
import { StyledCloseCircleTwoTone, StyledH3 } from '../api/styled';
import styled from 'styled-components';

const Div1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Div2 = styled.div`
    text-align: center;
`;

const noData = () => {
    return (
        <Div1>
            <Div2>
                <StyledCloseCircleTwoTone /> <br />
                <StyledH3>데이터가 없습니다</StyledH3>
            </Div2>
        </Div1>
    );
};

export default noData;
