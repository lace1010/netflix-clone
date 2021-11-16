import React, { useState } from 'react';
import styled from 'styled-components';
import FAQtab from './FAQtab.jsx';
import { FAQData } from '../../data.js';
import { KeyboardArrowRight } from '@material-ui/icons';
import { publicRequest } from '../../RequestMethods/requestBackendAPI';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    margin-top: 7px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(0, 0, 0);
    padding: 70px 0;
`
const Title = styled.span`
    font-size: 50px;
    font-weight: bold;

    @media (max-width: 950px) {
        font-size: 40px;
    }

    @media (max-width: 550px) {
        font-size: 25px;
    }
`

const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    @media (max-width: 950px) {
        margin-top: 30px;
    }
    @media (max-width: 550px) {
        margin-top: 20px;
    }
`
const FormContainer = styled.div`
    margin: 50px 0;
    text-align: center;
    width: 650px;
    max-width: 90vw;

    @media (max-width: 950px) {
        width: 500px;
        margin: 25px 0;
    }
`

const EmailLabel = styled.span`
    font-size: 19px;
    font-weight: 350;
    text-align: center;
    transition: all .3s ease;

    @media (max-width: 950px) {
        font-size: 23px;
    }

    @media (max-width: 740px) {
        font-size: 18px;
    }
    @media (max-width: 550px) {
        width: 80%;
    }
`

const Form = styled.form`
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 20px;

    @media (max-width: 950px) {
        flex-direction: column;
        margin-top: 10px;
    }
`

const Input = styled.input`
    flex: 3;
    padding: 20px 15px 20px 15px;
    font-size: 16px;
    border: 1px solid grey;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;;
    border-bottom: ${props => props.error};
    margin: 0;
    transition: all .3s ease;

    &:focus {
        outline: none;
        border: 1px solid #0071eb;
        border-bottom: ${props => props.error};
    }

    @media (max-width: 740px) {
        font-size: 14px;
        padding: 15px 10px 15px 10px;
    }
`
const InputPlaceholder = styled.span`
    position: absolute;
    top: 0;
    left:0;
    color: #8c8c8c;
    padding: 18px;
    pointer-events: none; // Makes sure input is always abled to be clicked even on top of placeholder span
    transition: all .2s ease;
    transform-origin: left top;

    // If Input is focused it transform label. And if Input has a value then keep label transformed
    ${Input}:focus ~ &, ${Input}:valid ~ &  {
        transform: scale(.7);
        padding: 10px 20px;
    }

    @media (max-width: 740px) {
        font-size: 14px;
    }
`
const SubmitInput = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    border: none;
    cursor: pointer;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;;
    font-size: 25px;
    padding: 0 15px 0 22px;
    font-weight: 500;
    background-color: #E50914;
    color: white;
    transition: all .3s ease;

    @media (max-width: 950px) {
        font-size: 16px;
        margin-top: 10px;
        border-radius: 3px;
        align-self: center;
        padding: 5px 10px
    }
`
const Icon = styled.span`
    display: flex;
    align-items: center;
    transform: scale(1.4);
    margin-left: 5px;
    transition: all .3s ease;

    @media (max-width: 950px) {
        transform: scale(1);
        margin-left: 2px;
    }
`

const Error = styled.div`
    color: #ffa00a;
    float: left;
    margin-top: 5px;
    font-size: 14px;
`

const FAQtabs = () => {

    // annoyingly redid submit function twice. in Hindsight I should have made the function a component
    // and reused the function twice instead.
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // check if email is valid and if it is already in the database
        if (!emailRegex.test(email)) {
            setErrorMessage("Please Enter a valid email address");
            return false;
        } 
        
        const user = {
            email: email,
            password: ""
        }

        publicRequest.post("/auth/sign-in", user).then(res => {
            console.log(res.data, "<= res.data");
            // handle error messages.
            if (res.data === "email does not exist") {
                setErrorMessage("");
                navigate("/register", { state: email });
            } else {
                navigate("sign-in");
            }
        })
    }

    return (
        <Container>
            <Title>Frequently Asked Questions</Title>
            <TabsContainer>
                {FAQData.map((item) => (
                    <FAQtab item={item} key={item.id}/>
            ))}
            </TabsContainer>
            <FormContainer>
                <EmailLabel>Ready to watch? Enter your email to create or restart your membership.</EmailLabel>
                <Form onSubmit={handleSubmit}>
                    <Input error={errorMessage ? "2px solid orange" : "none"} type="" name="email" required/>
                    <InputPlaceholder>Email address</InputPlaceholder>
                    <SubmitInput type="submit">Get Started<Icon><KeyboardArrowRight/></Icon></SubmitInput>
                </Form>
                {errorMessage && <Error>{errorMessage}</Error>}
            </FormContainer>
        </Container>
    )
}

export default FAQtabs;
