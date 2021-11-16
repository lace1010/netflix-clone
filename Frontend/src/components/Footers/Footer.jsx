import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: #757575;
    padding:65px 0;
`

const Wrapper = styled.div`
    width: 80vw;
    max-width: 900px;
`
const Text = styled.div`
    font-size: 16px;
`
const Number = styled.a`
    text-decoration: none;
    color: #757575;
    &:hover {
        text-decoration: underline;
    }
`

const List = styled.ul`
    margin: 30px 0 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 25%;
    font-size: 13px;
    list-style-type: none;
    margin-bottom: 18px;
    transition: all .3s ease;

    @media (max-width: 740px) {
        width: 30%;
    }
    @media (max-width: 500px) {
        width: 50%;
    }
`
const ALink = styled.a`
    color: #757575;
    text-decoration: none;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`

const Footer = () => {
    return (
        <Container>
            <Wrapper>
                <Text>Questions? Call <Number href="tel:+1-(888)-888-8888">+1-(888)-888-8888</Number></Text>
                <List>
                    <ListItem><ALink href="#">FAQ</ALink></ListItem>
                    <ListItem><ALink href="#">Help Center</ALink></ListItem>
                    <ListItem><ALink href="#">Account</ALink></ListItem>
                    <ListItem><ALink href="#">Media Center</ALink></ListItem>
                    <ListItem><ALink href="#">Investor Relations</ALink></ListItem>
                    <ListItem><ALink href="#">Jobs</ALink></ListItem>
                    <ListItem><ALink href="#">Ways to Watch</ALink></ListItem>
                    <ListItem><ALink href="#">Terms of Use</ALink></ListItem>
                    <ListItem><ALink href="#">Privacy</ALink></ListItem>
                    <ListItem><ALink href="#">Cookie Preferences</ALink></ListItem>
                    <ListItem><ALink href="#">Corporate Information</ALink></ListItem>
                    <ListItem><ALink href="#">Contact Us</ALink></ListItem>
                    <ListItem><ALink href="#">Speed Test</ALink></ListItem>
                    <ListItem><ALink href="#">Legal Notices</ALink></ListItem>
                    <ListItem><ALink href="#">Only on Netflix</ALink></ListItem>
                </List>
            </Wrapper>
        </Container>
    )
}

export default Footer;
