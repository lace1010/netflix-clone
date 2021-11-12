import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Row from "../components/Row";
import { requests } from "../requestMethod";


const Container = styled.div`
    background-color: black;
    color: white;
`

const Home = () => {
    return (
        <Container>
            <Navbar />
            <Banner />
            <Row rowTitle="Trending Now" url={requests.fetchTrending} largeRow />
            <Row rowTitle="Only on Netflix" url={requests.fetchOriginals} />
            <Row rowTitle="Top Rated" url={requests.fetchTopRated} />
            <Row rowTitle="Action movies" url={requests.fetchActionMovies} />
            <Row rowTitle="Comedies" url={requests.fetchComedyMovies} />
            <Row rowTitle="Horror" url={requests.fetchHorrorMovies} />
            <Row rowTitle="Romantic Films" url={requests.fetchRomanceMovies} />
            <Row rowTitle="Documentaries" url={requests.fetchDocumentaries} />
        </Container>
    )
}

export default Home
