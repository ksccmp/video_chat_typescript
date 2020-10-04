import * as React from 'react';
import styled from 'styled-components';

interface Isize {
    size: number;
}

const Div1 = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-bottom: 3rem;
`;

const Div2 = styled.div`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const Span1 = styled.span`
    display: table-cell;
`;

const Div3 = styled.div`
    display: table-cell;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        width: 3px;
        height: 100%;
        background-color: rgb(0, 0, 0);
        z-index: 1;
    }
`;

const Ul1 = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 70%;
`;

const RightLi1 = styled.li`
    &:before {
        content: '';
        position: absolute;
        width: ${(props: Isize) => props.size}rem;
        height: 3px;
        background-color: rgb(0, 0, 0);
    }

    position: relative;
    margin: 2rem 0;
    display: flex;
    align-items: center;
`;

const LeftLi1 = styled.li`
    &:before {
        content: '';
        position: absolute;
        width: ${(props: Isize) => props.size}rem;
        height: 3px;
        background-color: rgb(0, 0, 0);
        right: 100%;
    }

    position: relative;
    margin: 2rem 0;
    display: flex;
    align-items: center;
`;

const RightSpan1 = styled.span`
    &:before {
        content: '';
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: rgb(0, 0, 0);
        margin-left: ${(props: Isize) => props.size}rem;
    }

    position: relative;
    display: flex;
    align-items: center;
`;

const LeftSpan1 = styled.span`
    &:before {
        content: '';
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: rgb(0, 0, 0);
        margin-right: ${(props: Isize) => props.size}rem;
        right: 100%;
    }

    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
`;

const RightDiv1 = styled.div`
    margin-left: ${(props: Isize) => props.size}rem;
`;

const LeftDiv1 = styled.div`
    position: absolute;
    margin-right: ${(props: Isize) => props.size}rem;
    right: 100%;
    width: 100%;
    & * {
        float: right;
        clear: both;
    }
`;

const H21 = styled.h2`
    text-align: center;
    color: #61b3cb;
    font-family: 'Lato', sans-serif;
`;

const H31 = styled.h3`
    margin: 0;
    padding: 0;
    color: #61b3cb;
    font-family: 'Lato', sans-serif;
`;

const H41 = styled.h4`
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
`;

const H51 = styled.h5`
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
`;

const H61 = styled.h6`
    margin: 0;
    padding: 0;
    font-family: 'Lato', sans-serif;
`;

const intro = () => {
    const [lineWidth, setLineWidth] = React.useState<number>(18);
    const [divWidth, setDivWidth] = React.useState<number>(4);

    return (
        <>
            <Div1>
                <H21>2019.07</H21>
                <Div2>
                    <Span1></Span1>
                    <Div3>
                        <Ul1>
                            <RightLi1 size={lineWidth}>
                                <RightSpan1 size={lineWidth}>
                                    <RightDiv1 size={lineWidth + divWidth}>
                                        <H31>20일</H31>
                                        <div>
                                            <H41>자바스크립트를 이용한 화상채팅 구현 계획</H41>
                                        </div>
                                    </RightDiv1>
                                </RightSpan1>
                            </RightLi1>
                            <LeftLi1 size={lineWidth}>
                                <LeftSpan1 size={lineWidth}>
                                    <LeftDiv1 size={lineWidth + divWidth}>
                                        <H31>30일</H31>
                                        <div>
                                            <H41>기본환경 셋팅</H41>
                                        </div>
                                        <ul>
                                            <li style={{ float: 'left' }}>
                                                <H51>Babel / Webpack / ESLint / Prettier 등 적용</H51>
                                            </li>
                                            <li style={{ float: 'left' }}>
                                                <H51>Redux / Redux Saga 적용</H51>
                                            </li>
                                        </ul>
                                    </LeftDiv1>
                                </LeftSpan1>
                            </LeftLi1>
                        </Ul1>
                    </Div3>
                </Div2>

                <H21>2019.08</H21>
                <Div2>
                    <Span1></Span1>
                    <Div3>
                        <Ul1>
                            <RightLi1 size={lineWidth}>
                                <RightSpan1 size={lineWidth}>
                                    <RightDiv1 size={lineWidth + divWidth}>
                                        <H31>3일</H31>
                                        <div>
                                            <H41>자바스크립트 → 타입스크립트 전환</H41>
                                        </div>
                                    </RightDiv1>
                                </RightSpan1>
                            </RightLi1>
                            <LeftLi1 size={lineWidth}>
                                <LeftSpan1 size={lineWidth}>
                                    <LeftDiv1 size={lineWidth + divWidth}>
                                        <H31>19일</H31>
                                        <div>
                                            <H41>Socket 적용 (채팅기능 추가)</H41>
                                        </div>
                                    </LeftDiv1>
                                </LeftSpan1>
                            </LeftLi1>
                        </Ul1>
                    </Div3>
                </Div2>

                <H21>2019.09</H21>
                <Div2>
                    <Span1></Span1>
                    <Div3>
                        <Ul1>
                            <RightLi1 size={lineWidth}>
                                <RightSpan1 size={lineWidth}>
                                    <RightDiv1 size={lineWidth + divWidth}>
                                        <H31>7일</H31>
                                        <div>
                                            <H41>RTCPeerConnection 적용 (화상채팅 구현)</H41>
                                            <H41>&nbsp;※ 동일 네트워크 제한</H41>
                                        </div>
                                    </RightDiv1>
                                </RightSpan1>
                            </RightLi1>
                            <LeftLi1 size={lineWidth}>
                                <LeftSpan1 size={lineWidth}>
                                    <LeftDiv1 size={lineWidth + divWidth}>
                                        <H31>17일</H31>
                                        <div>
                                            <H41>메인화면 디자인</H41>
                                        </div>
                                    </LeftDiv1>
                                </LeftSpan1>
                            </LeftLi1>
                            <RightLi1 size={lineWidth}>
                                <RightSpan1 size={lineWidth}>
                                    <RightDiv1 size={lineWidth + divWidth}>
                                        <H31>21일</H31>
                                        <div>
                                            <H41>화상채팅화면 디자인</H41>
                                        </div>
                                    </RightDiv1>
                                </RightSpan1>
                            </RightLi1>
                            <LeftLi1 size={lineWidth}>
                                <LeftSpan1 size={lineWidth}>
                                    <LeftDiv1 size={lineWidth + divWidth}>
                                        <H31>29일</H31>
                                        <div>
                                            <H41>메인화면 기능 구현</H41>
                                        </div>
                                    </LeftDiv1>
                                </LeftSpan1>
                            </LeftLi1>
                        </Ul1>
                    </Div3>
                </Div2>

                <H21>2019.10</H21>
                <Div2>
                    <Span1></Span1>
                    <Div3>
                        <Ul1>
                            <RightLi1 size={lineWidth}>
                                <RightSpan1 size={lineWidth}>
                                    <RightDiv1 size={lineWidth + divWidth}>
                                        <H31>1일</H31>
                                        <div>
                                            <H41>인트로화면 디자인</H41>
                                        </div>
                                    </RightDiv1>
                                </RightSpan1>
                            </RightLi1>
                            <LeftLi1 size={lineWidth}>
                                <LeftSpan1 size={lineWidth}>
                                    <LeftDiv1 size={lineWidth + divWidth}>
                                        <H31>2일</H31>
                                        <div>
                                            <H41>색상 디자인</H41>
                                        </div>
                                    </LeftDiv1>
                                </LeftSpan1>
                            </LeftLi1>
                        </Ul1>
                    </Div3>
                </Div2>
            </Div1>
        </>
    );
};

export default intro;
