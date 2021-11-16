import React from 'react';
import styled from 'styled-components';
import NavbarHome from '../navbars/NavbarHome';
import HomeHeader from '../components/Home/HomeHeader';
import Jumbotron from '../components/Home/Jumbotron';
import FAQtabs from '../components/FAQ/FAQtabs';
import Footer from '../components/Footers/Footer';
import { JumbotronData } from '../data.js';


const Container = styled.div`
`
const Home = () => {
    return (
        <Container>
            <NavbarHome/>
            <HomeHeader/>
            {JumbotronData.map((item) => (
                 <Jumbotron item={item} key={item.id}/>
            ))}
            <FAQtabs />
            <Footer />
        </Container>
    )
}

export default Home;
