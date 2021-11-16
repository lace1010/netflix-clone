import React from 'react';
import styled from 'styled-components';
import Navbar from '../navbars/NavbarBrowse';
import Banner from '../components/Browse/Banner';
import Row from "../components/Browse/Row";
import { requests } from "../RequestMethods/requestTMDB";

const Container = styled.div`
    background-color: black;
    color: white;
`

const Movies = () => {
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

export default Movies;
