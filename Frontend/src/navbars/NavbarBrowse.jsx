import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import netflixImg from '../images/netflixlogo.png';
import avatar from '../images/avatar.png';

const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    box-sizing: border-box; // ensures we don't extend past the page with padding
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.color};
    transition: all .3s ease;
    z-index:2;
`

const Logo = styled.img`
    height: 20px;
`

const User = styled.img`
    height: 20px;
`


const Navbar = () => {
    const [bgColor, setBgColor] = useState("transparent")

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 250) {
                setBgColor("black");
              } else setBgColor("transparent");
        });

        return () => {
            window.removeEventListener("scroll", null);
        };
    }, []);

    return (
        <Container color={bgColor}>
            <Logo src={netflixImg} alt="netflix logo"/>
            <User src={avatar} alt="default avatar" />
        </Container>
    )
}

export default Navbar;
