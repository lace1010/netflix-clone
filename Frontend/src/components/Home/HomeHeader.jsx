import React from 'react';
import styled from 'styled-components';
import RegisterForm from '../registerInput';
import netflixBG from '../../images/netflix-bg.jpg';

const Container = styled.div`
    height: 75vh;
    min-height: 700px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 550px) {
        height: 525px;
        min-height: 250px;
        padding-top: 30px;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 680px;
    transition: all .3s ease;
    @media (max-width: 950px) {
        width: 500px;
    }

    @media (max-width: 550px) {
        width: 90vw;
    }
`
const Title = styled.span`
    width: 30rem;
    font-size: 47px;
    font-weight: 600;
    text-align: center;

    @media (max-width: 550px) {
        width: 95%;
        font-size: 27px;
    }    
`
const Desc = styled.span`
    font-size: 25px;
    font-weight: 350;
    text-align: center;
    margin: 15px 0 30px 0;

    @media (max-width: 550px) {
        font-size: 1.125rem;
    }

`

const HomeHeader = () => {
    return (
        <Container style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `radial-gradient(rgba(0,0,0,.1), rgba(0,0,0)), url(${netflixBG})`, //linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))
            backgroundPosition: "center center"
        }}>
            <InfoContainer>
                <Title>Unlimited movies, TV shows, and more.</Title>
                <Desc>Watch anywhere. Cancel anytime.</Desc>
                <RegisterForm />
            </InfoContainer>
        </Container>
    )
}

export default HomeHeader
