import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import NoData from '../../common/noData';
import { StyledButton1, StyledH4 } from '../../api/styled';

const div1: React.CSSProperties = {
    display: 'grid',
    gridTemplateRows: '8fr 2fr',
};

const search: React.FC<RouteComponentProps> = ({ history }) => {
    const onBack = () => {
        history.push('/user/signIn');
    };

    return (
        <>
            <div style={div1}>
                <NoData /> <br /> <br />
                <StyledButton1 style={{ margin: '0 auto' }} onClick={onBack}>
                    <StyledH4>Back</StyledH4>
                </StyledButton1>
            </div>
        </>
    );
};

export default withRouter(search);
