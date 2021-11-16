import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosInstance, { requests } from '../../RequestMethods/requestTMDB';

const Container = styled.div`
    position: relative;
    height: 500px;
    display: flex;
    align-items: center;
`

const Overlay = styled.div`
    align-self: flex-end;
    position: absolute;
    width: 100%;
    height: 25%;
    background: linear-gradient(to top, black,  transparent);
    z-index: 1;
`
const InfoContainer = styled.div`
    width: 500px;
    margin-left: 10vw;
    margin-right: 10vw;
`
const Title = styled.div`
    font-weight: bold;
    font-size: 60px;
`

const ButtonContainer = styled.div`
    display: flex;
    margin: 5px 0 20px 0;
`
const Button = styled.div`
    border: none;
    background: rgba(60, 60, 60, 0.8);
    color:white;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 25px;
    margin-right: 10px;
    cursor: pointer;
    transition: all .3s ease;

    &:hover {
        color: black;
        background-color: #e6e6e6;
    }
`
const Desc = styled.span`
    font-size: 14px;
    line-height: 1.3;
`
const Banner = () => {
    const BASE_URL_IMAGE = "http://image.tmdb.org/t/p";
    const [bannerMovie, setBannerMovie] = useState({});
    const [bannderDesc, setBannerDesc] = useState("");
    


    useEffect(() => {
        const fetchMovies = async () =>  {
            const request = await axiosInstance.get(requests.fetchOriginals);
            // We do this because api sometimes returns null for certain movie images.
            // If had own database would be easy. but too time consuming to do that.
            
            const filteredRequest = request.data.results.filter((item) => item.backdrop_path !== null);
            const randomBannerMovie = filteredRequest[Math.floor(Math.random() * (filteredRequest.length - 1))];
            
            setBannerMovie(randomBannerMovie);
            
            // if description is too long cut it and add ...
            const description = randomBannerMovie.overview;
            if (description.length < 200) {
                setBannerDesc(description);
            } else {
                setBannerDesc(description.slice(0, 200) + "...");
            }
        }
        fetchMovies();
    }, [])
    
    return (
        // could pass prop to styled components but one inline style for background is fine.
        <Container style={{
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${BASE_URL_IMAGE}/original${bannerMovie.backdrop_path})`,
                backgroundPosition: "center center"
            }}>
                <Overlay />
                <InfoContainer>
                    <Title>{bannerMovie?.title || bannerMovie?.name}</Title>
                    <ButtonContainer>
                        <Button>Play</Button>
                        <Button>My List</Button>
                    </ButtonContainer>
                    <Desc>{bannderDesc}</Desc>
                </InfoContainer>
           
        </Container>
    )
}

export default Banner
