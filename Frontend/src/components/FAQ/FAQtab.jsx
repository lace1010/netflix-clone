import { Add } from '@material-ui/icons';
import React, { useState  } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    margin-bottom: 10px;
    max-width: 750px;

    @media (max-width: 950px) {
        width: 75vw;
    }
    @media (max-width: 550px) {
        width: 90vw;
        margin-bottom: 7px;
    }
`
const Container = styled.div`
    background-color: #303030;
    width: 100%;
    padding: 23px 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    @media (max-width: 950px) {
        padding: 15px 25px;
    }
    @media (max-width: 550px) {
        padding: 10px 25px;
    }
`

const Question = styled.span`
    font-size: 25px;
    font-weight: 500;

    @media (max-width: 950px) {
        font-size: 20px;
    }
    @media (max-width: 550px) {
        font-size: 18px;
    }
`
const Icon = styled.span`
    transition: all .3s ease;
    transform: scale(1.7);
    @media (max-width: 950px) {
        transform: scale(1.4);
    }

    @media (max-width: 550px) {
        transform: scale(1);
    }
`
const AnswerContainerShow = styled.div`
    height: ${props => props.active ? "auto" : "0"};
    width: 100%;
    margin-top: 1px;
    background-color: #303030;
    padding-top: ${props => props.active ? "23px" : "0"};
    padding-bottom: ${props => props.active ? "23px" : "0"};
    padding-left: 35px;
    padding-right: 35px;
    font-size: 25px;
    font-weight: 500;
    line-height: 1.3;
    transition: all .3s ease;
    overflow: hidden;

    @media (max-width: 950px) {
        padding-left: 25px;
        padding-right: 25px;
        font-size: 20px;
    }
    @media (max-width: 950px) {
        font-size: 18px;
    }
`

const FAQtab = ({item}) => {
    const [toggle, setToggle] = useState(false)

    return (
        <Wrapper>
            <Container onClick={() =>{ toggle ? setToggle(false) : setToggle(true)}}>
              
                    <Question>{item.header}</Question>
                    <Icon>{toggle ? <FontAwesomeIcon icon={faMinus} /> : <Add/>}</Icon>
         
            </Container>
            <AnswerContainerShow active={toggle}>
                {item.body}
            </AnswerContainerShow>

        </Wrapper>
    )
}

export default FAQtab;
