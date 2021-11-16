import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarRegister from '../navbars/NavbarRegister.jsx';
import FooterRegister from '../components/Footers/FooterRegister.jsx';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { publicRequest } from '../RequestMethods/requestBackendAPI.js';

const Container = styled.div`
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 675px;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90vw;
    max-width: 450px;
`

const Title = styled.div`
    font-size: 25px;
    font-weight: bold;
`
const Subtitle = styled.div`
    font-weight: 350;
    font-size: 22px;
    margin: 20px 0;
`

const InputBox = styled.div`
    display: flex;
    position: relative;
    width: 100%;
`

const Input = styled.input`
    flex: 1;
    padding: 21px 8px 15px 15px;
    font-size: 16px;
    border: ${props => props.error};
    border-radius: 5px;
    margin-bottom: 10px;
    transition: all .3s ease;
    &:focus {
        outline: none;
        border: 1px solid #0071eb;
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
        padding: 10px 26px;
    }

    @media (max-width: 740px) {
        font-size: 14px;
    }
`
const OfferText = styled.span`
    font-size: 16px;
    font-weight: 350px;
`

const Button = styled.button`
    margin-top: 25px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
`
const Checkbox = styled.input``
const Error = styled.span`
    color: #e50914;
    font-size: 12px;
    margin-top: -8px;
    margin-bottom: 10px;
`
const Register = () => {
    // get email that was passed as state in navigate()
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state;
    const [errorMessage, setErrorMessage] = useState("")
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        const newUser = {
            email: email,
            password: password,
        }

        if (!emailRegex.test(email)) {
            setErrorMessage("invalid email address.");
            return false;
        } else if (password.length <= 8) {
            setErrorMessage("Password needs to be at least 8 characters");
            return false;
        } else {
            setErrorMessage("");
            publicRequest.post('/auth/register', newUser)
                .then(() => {
                    alert("Thank you for registering. Now Sign in and enjoy the site!");
                    navigate("/sign-in");
                });
        }

    }
    return (

        <div style={{backgroundColor:"white"}}>
             <NavbarRegister />
            <Container>
                <Form onSubmit={handleSubmit} autoFocus={false}>
                    <Title>Create a password to start your membership</Title>
                    <Subtitle>Just a few more steps and you're done! We hate paperwork, too.</Subtitle>
                    <InputBox>
                        <Input error={errorMessage.includes("email") ? "1px solid red" : "1px solid grey"} 
                            name="email" defaultValue={email} required/>
                        <InputPlaceholder>Email address</InputPlaceholder>
                    </InputBox>
                    {errorMessage.includes("email") && <Error>{errorMessage}</Error>}
                    <InputBox>
                        <Input error={errorMessage.includes("Password") ? "1px solid red" : "1px solid grey"} 
                            type="password" name="password" required/>
                        <InputPlaceholder>Add a password</InputPlaceholder>
                    </InputBox>
                    {errorMessage.includes("Password") && <Error>{errorMessage}</Error>}
                    <OfferText><Checkbox type="checkbox"/>Please do not email me Netflix special offers.</OfferText>
                    <Button type="submit">Register</Button>
                </Form>
            </Container>
            <FooterRegister/>
        </div>
    )
}

export default Register;
