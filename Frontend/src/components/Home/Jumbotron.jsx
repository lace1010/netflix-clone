import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    justify-content: center;
    background-color: black;
    margin-top: 7px;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    align-items: center;
    justify-content: space-between;
    background-color: black;
    padding: 80px 0;
    transition: all .3s ease;
    width: 90vw;
    max-width: 1100px;

    @media (max-width: 950px) {
        padding: 60px 0 60px 0;
        flex-direction: column;
    }

    @media (max-width: 550px) {
        padding: 50px 0 50px 0;
    }
    
`
const InfoContainer = styled.div`
    flex: .5;
    display: flex;
    flex-direction: column;
    width: 500px;

    @media (max-width: 950px) {
        width: 90vw;
    }
`

const Title = styled.span`
    font-weight: bold;
    font-size: 47px;

    @media (max-width: 950px) {
        font-size: 38px;
        text-align: center;
    }

    @media (max-width: 550px) {
        font-size: 25px;
    }
`

const Subtitle = styled.span`
    font-size: 28px;
    font-weight: 300px;
    margin-top: 20px;

    @media (max-width: 950px) {
        font-size: 20px;
        text-align: center;
    }

    @media (max-width: 550px) {
        font-size: 18px;
    }
`

const ImgContainer = styled.div`
    flex: 1;
    max-width: 400px;

    @media (max-width: 950px) {
        max-width: 600px;
    }
`
const Img = styled.img`
    max-width: 100%;
`

const Jumbotron = ({item}) => {
    return (
        <Container>
            <Wrapper direction={item.direction}>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Subtitle>{item.subtitle}</Subtitle>
                </InfoContainer>
                <ImgContainer>
                    <Img src={item.image} alt={item.alt}/>
                </ImgContainer>
            </Wrapper>
        </Container>
    )
}

export default Jumbotron;
