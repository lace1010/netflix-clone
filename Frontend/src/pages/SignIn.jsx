
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FooterSignIn from '../components/Footers/FooterSignIn';
import netflixBG2 from '../images/netflix-bg-2.jpeg';
import netflixLogo from '../images/netflixlogo.png';
import facebookIcon from '../images/Facebook_icon_2013.svg.png';
import { publicRequest } from '../RequestMethods/requestBackendAPI';

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 100vh;
    min-height: 850px;

    @media (max-width: 740px) {
        min-height: 0;
        height: 625px;
    }
`
const Img = styled.img`
    position: absolute;
    top:0;
    left: 0;
    padding: 20px 40px;
    height: 56px;
    @media (max-width: 740px) {
        padding: 10px 15px;
    }
    @media (max-width: 700px) {
        padding: 20px;
        height: 25px;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0,0,0,.75);
    border-radius: 2px;
    width: 85vw;
    max-width: 450px;
    height: 78%;
    margin-top: 100px;

    @media (max-width: 740px) {
        background-color: black;
        width: 100vw;
        max-width: none;
        margin-top: 0;
        height: 100%;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 70%;
    @media (max-width: 740px) {
        width: 90%;
        margin-top: 50px;
    }
    @media (max-width: 700px) {
        margin-top: 40px;
    }
`
const Title = styled.h1`
    margin: 50px 0 30px 0;
    width: 60%;
`
const InputBox = styled.div`
    position: relative;
    display: flex;
    width: 100%;
`

const Input = styled.input`
    flex: 1;
    padding: 25px 20px 5px 20px;
    font-size: 16px;
    border: none;
    border-radius: 3px;
    margin-bottom: 15px;
    background-color: rgba(59,59,59, .9);
    color: white;

    &:focus {  
        outline: none; 
        background-color: #464646;
        // show on error border-bottom: 2px solid #e87c03;
    }
    @media (max-width: 740px) {
        font-size: 15px;
    }
`
const InputPlaceholder = styled.span`
    position: absolute;
    top: 0;
    left:0;
    color: #8c8c8c;
    padding: 15px 20px;
    pointer-events: none; // Makes sure input is always abled to be clicked even on top of placeholder span
    transition: all .2s ease;
    transform-origin: left top;

    // If Input is focused it transform label. And if Input has a value then keep label transformed
    ${Input}:focus ~ &, ${Input}:valid ~ &  {
        transform: scale(.7);
        padding: 10px 26px;
    }

    @media (max-width: 740px) {
        font-size: 15px;
    }
`
const Button = styled.button`
    margin-top: 25px;
    background-color: #e50914;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 15px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
`
const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    @media (max-width: 740px) {
        width: 90%;
    }
`
const HelpContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`
const RememberMe = styled.span`
    display: flex;
    align-items: center;
    color: #b3b3b3;
    font-size: 13px;
    font-weight: 500;
`
const Checkbox = styled.input`
    height: 15px;
    width: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: none;
    border-radius: 4px;
    outline: none;
    transition-duration: 0.3s;
    background-color: #c1c1c1;

    &:checked {
        background-color: red;
        content: '\2713';
    }
`
const HelpItem = styled.span`
    color: #b3b3b3;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const OtherOptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: #8c8c8c;
    margin-top: 50px;
`
const FacebookLogin = styled.span`
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
`
const Icon = styled.img`
    height: 20px;
    margin-right: 10px;
`
const SignUp = styled.span`
    margin: 15px 0;
    font-weight: 400;
    font-size: 15px;
`
const SignUpLink = styled(Link)`
    color: white;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const Text = styled.span`
    font-size: 13px;
`
const MoreTextButton = styled.span`
    margin-left: 5px;
    color: #0071eb;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
const LearnMoreText = styled.span`
    transition: all .8s ease;
    margin-top: 15px;
    font-size: 13px;
    pointer-events: ${props => props.opacity ? "fill" : "none"};
    opacity: ${props => props.opacity};
`
const MoreTextLink = styled.a`
    color: #0071eb;
    text-decoration: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`
const Error = styled.div`
    padding: 10px 20px 10px 20px;
    margin-bottom: 15px;
    border-radius: 3px;
    background-color: #e87c03;
    color: white;
`

const SignIn = () => {
    const navigate = useNavigate();
    const [moreText, setMoreText] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // ensure the value inputs are valid before calling api.
         // set up email regex. and regex for valid names.
         if (!emailRegex.test(email)) {
            setErrorMessage("invalid email address.");
            return false;
        } else if (password.length <= 8) {
            setErrorMessage("password needs to be at least 8 characters");
            return false;
        } 
        else {
            const user = {
                email: email,
                password: password
            }
            publicRequest.post("/auth/sign-in", user).then(res => {
                console.log(res.data);
                // handle error messages.
                if (res.data === "email does not exist") {
                    setErrorMessage("Sorry, we can't find an account with this email address. Please try again or create a new account.")
                } else if (res.data === "incorrect password") {
                    setErrorMessage("Incorrect password. Please try again or you can reset your password.")
                } else {
                    setErrorMessage("");
                    navigate("/browse");
                }
            })
        }
    }

    return (
        <div style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${netflixBG2})`, 
            backgroundPosition: "center center"
        }}>
        <Container>
            <Wrapper>
                <Img src={netflixLogo} alt="netflixLogo"/>
                <Form onSubmit={handleSubmit} autoFocus={false}>
                    <Title>Sign In</Title>
                    {errorMessage && <Error>{errorMessage}</Error>}
                    <InputBox>
                        <Input name="email" required/><InputPlaceholder>Email address</InputPlaceholder>
                    </InputBox>
                    <InputBox>
                        <Input name="password" type="password" required/><InputPlaceholder>Password</InputPlaceholder>
                    </InputBox>
                    <Button type="submit">Sign In</Button>
                </Form>
                <BottomContainer>
                    <HelpContainer>
                        <RememberMe><Checkbox type="checkbox"/>Remember Me</RememberMe>
                        <HelpItem onClick={() => alert("Sorry, this link has not been cloned.")}>Need Help?</HelpItem>
                    </HelpContainer>

                    <OtherOptionsContainer>
                        <FacebookLogin onClick={() => alert("Sorry, this link has not been cloned.")}>
                            <Icon src={facebookIcon} alt="facebook logo"/>Login with Facebook
                        </FacebookLogin>
                        <SignUp>New to Netflix? <SignUpLink to="/">Sign up now</SignUpLink>.</SignUp>
                        <Text>
                            This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            {moreText ? null : <MoreTextButton onClick={() => moreText ? setMoreText(false) : setMoreText(true)}>Learn more.</MoreTextButton>}
                        </Text>
                        
                            <LearnMoreText opacity={moreText ? "1" : "0"}>
                                The information collected by Google reCAPTCHA is subject to the Google <MoreTextLink href="https://policies.google.com/terms">Privacy Policy</MoreTextLink> and <MoreTextLink href="https://policies.google.com/privacy">Terms of Service</MoreTextLink>, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).
                            </LearnMoreText>  
                    </OtherOptionsContainer>
                </BottomContainer>
            </Wrapper>
        </Container>
        <FooterSignIn/>
        </div>
    )
}

export default SignIn;
