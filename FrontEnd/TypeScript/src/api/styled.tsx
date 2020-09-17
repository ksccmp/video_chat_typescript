import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledInput1 = styled.input`
    border: 2px solid skyblue;
    border-radius: 4px;
    width: 10em;
    margin: 0.3em;
    height: 1.3em;
    &::placeholder {
        text-align: center;
    }
    &:focus {
        outline: none;
        &::placeholder {
            opacity: 0;
            transition: 0.5s;
        }
    }
`;

export const StyledInput2 = styled.input`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3em;
    width: 10em;
    height: 1.3em;
    &::placeholder {
        text-align: center;
    }
    &:focus {
        outline: none;
        &::placeholder {
            opacity: 0;
            transition: 0.5s;
        }
    }
`;

export const StyledButton1 = styled.button`
    width: 10em;
    height: 2em;
    background-color: orange;
    color: white;
    border-radius: 4px;
    border: 2px solid orange;
    outline: none;
    margin: 0.3em;
    &:hover {
        background-color: purple;
        border: 2px solid purple;
    }
`;

export const StyledButton2 = styled.button`
    width: 4em;
    height: 2em;
    background-color: #dda0dd;
    color: white;
    border-radius: 4px;
    border: 2px solid #dda0dd;
    outline: none;
    margin: 0.3em;
    vertical-align: middle;
    &:hover {
        background-color: #d8bfd8;
        border: 2px solid #d8bfd8;
    }
`;

export const StyledSelect1 = styled.select`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3em;
    width: 10.5em;
    height: 1.8em;
    outline: none;
`;

export const StyledSelect2 = styled.select`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3em;
    width: 10.5em;
    height: 1.8em;
    outline: none;
`;

export const StyledOption1 = styled.option`
    text-align: center;
`;

export const StyledOption2 = styled.option`
    text-align: center;
`;

export const StyledNav1 = styled.nav`
    background-color: #87ceeb;
    width: 100%;
    height: 100%;
`;

export const StyledNavUl1 = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
    width: 30%;
    height: 100%;
    text-align: center;
    display: table;
`;

interface IStyledNavLi1 {
    select: boolean;
}

export const StyledNavLi1 = styled.li`
    margin: 0 1em;
    display: table-cell;
    width: 3em;
    text-align: center;
    vertical-align: middle;
    background-color: ${(props: IStyledNavLi1) => (props.select ? 'rgba(0, 0, 0, 0.3)' : '')};
`;

export const StyledNavLink1 = styled(Link)`
    text-decoration: none;
    color: white;
    cursor: pointer;
`;

export const StyledTabDiv1 = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
    position: relative;
`;

export const StyledTabUl1 = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
    display: table;
    text-align: center;
    table-layout: fixed;
    width: 100%;
`;

export const StyledTabLi1 = styled.li`
    display: table-cell;
    vertical-align: middle;
    overflow: hidden;
`;

export const StyledTabRadio1 = styled.input`
    display: none;
    &:checked {
        & ~ label {
            transition: 0.1s;
            border-bottom: 2px solid blue;
        }
        & ~ div {
            display: block;
        }
    }
`;

export const StyledTabLabel1 = styled.label`
    display: inline-block;
    width: 100%;
`;

export const StyledTabSubdiv1 = styled.div`
    display: none;
    position: absolute;
    left: 0;
    padding: 1em;
    vertical-align: middle;
`;

export const StyledCardDiv1 = styled.div`
    border: 1px solid black;
    width: 18em;
    height: 13em;
    margin: 1em;
    display: grid;
    grid-template-rows: 5fr 3fr 1fr;
    border-radius: 10px;
    box-shadow: 3px 3px 5px #ffe4e1;
    float: left;
    position: relative;
    &:hover {
        cursor: pointer;
    }
`;

interface IStyledCardHeader1 {
    image: string;
}

export const StyledCardHeader1 = styled.header`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-image: url(${(props: IStyledCardHeader1) => props.image});
    background-size: 100%;
`;

export const StyledHeaderChange1 = styled.div`
    width: 100%;
    height: 100%;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

export const StyledCardArticle1 = styled.article`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
`;

export const StyledCardFooter1 = styled.footer`
    display: table;
`;

export const StyledCardFooterDiv1 = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    vertical-align: middle;
    display: table-cell;
`;

export const StyledTableCell = styled.div`
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    height: 100%;
`;

export const StyledH3 = styled.h3`
    margin: 0;
    padding: 0;
    display: inline-block;
`;

export const StyledH4 = styled.h4`
    margin: 0;
    padding: 0;
    display: inline-block;
`;

export const StyledH5 = styled.h5`
    margin: 0;
    padding: 0;
    display: inline-block;
`;

export const StyledH6 = styled.h6`
    margin: 0;
    padding: 0;
    display: inline-block;
`;

interface IStyledImage1 {
    image: string;
}

export const StyledImage1 = styled.div`
    background-image: url(${(props: IStyledImage1) => props.image});
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 70%;
    height: 80%;
    display: inline-block;
`;

export const StyledKey = styled.div`
    background-image: url('https://lh3.googleusercontent.com/proxy/4Wb5PskjwlDPAMOhA0hhYlonCX3UCiJgVKNR-fUky3ZDskAKmDgmwbQEJMF6SXxOtEMujQzb-ZJR9kMVKBL1dWZCVr-qWMtuq-JZWV3C9p7CWEwd2csb3qsZyJI');
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 10%;
    height: 100%;
    display: inline-block;
`;

export const StyledTabDiv2 = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid black;
`;

export const StyledTabUl2 = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: table;
    height: 2.5em;
    width: 100%;
    table-layout: fixed;
    position: relative;
`;

export const StyledTabLi2 = styled.li`
    display: table-cell;
    border: 1px solid black;
    text-align: center;
`;

export const StyledTabLabel2 = styled.label`
    width: 100%;
    height: 100%;
    display: table;
`;

export const StyledTabRadio2 = styled.input`
    display: none;
    &:checked {
        & ~ label {
            background-color: blue;
        }

        & ~ div {
            display: inline-block;
        }
    }
`;

export const StyledTabSubdiv2 = styled.div`
    border: 1px solid black;
    display: none;
    position: absolute;
    left: 0;
    text-align: left;
    padding: 0.5em;
`;

export const StyledVideo1 = styled.video`
    width: 100%;
`;
