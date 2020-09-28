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
    margin: 0.3rem;
    width: 10rem;
    height: 1.4rem;
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

export const StyledInput3 = styled.input`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3em;
    width: 90%;
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

export const StyledInput4 = styled.input`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3rem;
    width: 90%;
    height: 1.4rem;
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
    width: 4rem;
    height: 2rem;
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

export const StyledButton3 = styled.button`
    width: 90%;
    height: 2rem;
    background-color: #e0ffff;
    color: black;
    border-radius: 4px;
    border: 2px solid #e0ffff;
    outline: none;
    margin: 0.3em;
    vertical-align: middle;
    &:hover {
        background-color: #f0f8ff;
        border: 2px solid #f0f8ff;
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
    margin: 0.3rem;
    width: 10.5rem;
    height: 1.8rem;
    outline: none;
`;

export const StyledSelect3 = styled.select`
    border: 2px solid #6633cc;
    border-radius: 4px;
    margin: 0.3rem;
    width: 90%;
    height: 1.8rem;
    outline: none;
`;

export const StyledOption1 = styled.option`
    text-align: center;
`;

export const StyledOption2 = styled.option`
    text-align: center;
`;

export const StyledOption3 = styled.option`
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
    width: 3rem;
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
    display: table;
    width: 100%;
    height: 2rem;
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
    background-image: url('https://lh3.googleusercontent.com/proxy/FI7lPlMMUcAcboRuLLx5H3R1f7uwcnf_GZI3e_RK3UFqGiJvxjEzD8DkFklAFnSjjOMUTEQP1bxDoyxdTCincfbCCS_XQmk0VUsr9ItsDKUSbJY6aagEkQgxCwAAb4wV0JnuAzE9A5CmCDu9B5wpbHdq4kRv4EZzFWFvGw');
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 10%;
    height: 100%;
    display: inline-block;
`;

export const StyledSend = styled.div`
    background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqEXRiRu2iow-mACQR1rj1ppQ_3-BUU-4e7A&usqp=CAU');
    background-size: 90%;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 50%;
    width: 90%;
    height: 100%;
    display: inline-block;
`;

export const StyledTabDiv2 = styled.div`
    width: 100%;
    height: 100%;
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
            background-color: rgba(0, 0, 0, 0.3);
        }

        & ~ div {
            display: inline-block;
        }
    }
`;

export const StyledTabSubdiv2 = styled.div`
    display: none;
    position: absolute;
    left: 0;
    text-align: left;
    padding: 0.5em;
`;

export const StyledVideo1 = styled.video`
    width: 100%;
`;

interface IStyledChatContentsDiv1 {
    owner: boolean;
}

export const StyledChatContentsDiv1 = styled.div`
    width: 80%;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
`;

export const StyledChatContentsHeader1 = styled.header`
    clear: both;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
`;

export const StyledChatContentsFooter1 = styled.footer`
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    clear: both;
    float: ${(props: IStyledChatContentsDiv1) => (props.owner ? 'right' : 'left')};
    padding: 0.2em 0.4em;
    display: table;
    margin-bottom: 0.2em;
`;

export const StyledChatContentsDiv2 = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

export const StyledModalDiv1 = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledRoomModalDiv1 = styled.div`
    width: 25rem;
    height: 20rem;
    background-color: rgba(255, 255, 255, 0.8);
    text-align: center;
`;

export const StyledRadio1 = styled.input`
    display: none;
    &:checked {
        & + label {
            background-color: rgba(0, 0, 0, 0.6);
        }
    }
`;

export const StyledLabel1 = styled.label`
    border: 2px solid #6633cc;
    border-radius: 4px;
    background-color: white;
    flex-grow: 1;
    margin: 0 0.5rem;
`;

export const StyledH1 = styled.h1`
    margin: 0;
    padding: 0;
    display: inline-block;
`;

export const StyledH2 = styled.h2`
    margin: 0;
    padding: 0;
    display: inline-block;
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