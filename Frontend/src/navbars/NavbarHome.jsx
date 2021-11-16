import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import netflixImg from '../images/netflixlogo.png';

const Container = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    box-sizing: border-box; // ensures we don't extend past the page with padding
    padding: 25px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    transition: all .3s ease;
    z-index:2;

    @media (max-width: 550px) {
        padding: 20px 25px;
    }
`

const Logo = styled.img`
    height: 40px;
    @media (max-width: 950px) {
        height: 30px;
    }
`

const Button = styled.button`
    font-size: 14px;
    padding: 8px 18px;
    border: none;
    border-radius: 3px;
    background-color: #E50914;
    color: white;
    cursor: pointer;
`


const Navbar = () => {
    return (
        <Container>
            <Logo src={netflixImg} alt="netflix logo"/>
            <Link to="/sign-in"><Button>Sign In</Button></Link>
        </Container>
    )
}

export default Navbar;
