import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardArrowRight } from '@material-ui/icons';
import { publicRequest } from '../RequestMethods/requestBackendAPI';
import { useNavigate } from "react-router-dom";
const EmailLabel = styled.span`
    font-size: 20px;
    font-weight: 350;
    text-align: center;
    transition: all .3s ease;

    @media (max-width: 740px) {
        font-size: 17px;
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
    }
`

const Input = styled.input`
    flex: 2.5;
    padding: 21px 8px 15px 15px;
    font-size: 16px;
    border: 1px solid grey;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;;
    margin: 0;
    transition: all .3s ease;
    border-bottom: ${props => props.error};
    &:focus {
        outline: none;
        border: 1px solid #0071eb;
        border-bottom: ${props => props.error};
    }
    @media (max-width: 740px) {
        font-size: 14px;
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
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    border: none;
    cursor: pointer;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;;
    font-size: 25px;
    padding: 0 15px 0 25px;
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
    transform: scale(1.4);
    margin-left: 5px;
    transition: all .3s ease;

    @media (max-width: 950px) {
        transform: scale(1);
    }

`
const Error = styled.div`
    color: #ffa00a;
    float: left;
    margin-top: 5px;
    font-size: 14px;
`

const RegisterForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // check if email is valid
        if (!emailRegex.test(email)) {
            setErrorMessage("Please Enter a valid email address");
            return false;
        } 
        const user = {
            email: email,
            password: ""
        }
        publicRequest.post("/auth/sign-in", user).then(res => {
            // if it is not already in the database go to register page
            // send email as a state value in navigate to use for next page
            if (res.data === "email does not exist") {
                setErrorMessage("");
                navigate("/register", { state: email });
            } else {
                navigate("sign-in");
            }
        })
    }

    return (
        <div>
            <EmailLabel>Ready to watch? Enter your email to create or restart your membership.</EmailLabel>
            <Form onSubmit={handleSubmit}>
                <Input error={errorMessage ? "2px solid orange" : "none"} name="email" required/>
                <InputPlaceholder>Email address</InputPlaceholder>
                <SubmitInput type="submit">Get Started<Icon><KeyboardArrowRight/></Icon></SubmitInput>
            </Form>
            {errorMessage && <Error>{errorMessage}</Error>}
        </div>
    )
}

export default RegisterForm;
