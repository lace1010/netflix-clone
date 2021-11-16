import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import netflixImg from '../images/netflixlogo.png';

const Container = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    box-sizing: border-box; // ensures we don't extend past the page with padding
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    transition: all .3s ease;
    z-index:2;
    border-bottom: 1px solid lightgrey;
`

const Logo = styled.img`
    height: 58px;
`

const SignInLink = styled(Link)`
    color: #333;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
`
const NavbarRegister = () => {
    return (
        <Container>
            <Logo src={netflixImg} alt="netflix logo"/>
            <SignInLink to="/sign-in">Sign In</SignInLink>
        </Container>
    )
}

export default NavbarRegister
