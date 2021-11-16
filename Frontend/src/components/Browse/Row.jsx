import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../RequestMethods/requestTMDB';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const RowTitle = styled.h1`
    font-weight: bold;
    padding-left: 20px;
`
const RowContainer = styled.div`
    display: flex;
    overflow-x: scroll; // keeps width 100% and can scroll thorugh films
    padding: 10px 0 10px 20px;
    &::-webkit-scrollbar {
        display: none; // hides scroll bar so looks like netflix, but keeps functionality
  }
`
const Img = styled.img`
    margin-right: 10px;
    width: 100%;
    height: 250px; // #${props => props.height};
    transition: all .3s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.06);
    }
`
const SorryMessage = styled.div`
    height: 390px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Row = ({rowTitle, url, largeRow}) => {
    const BASE_URL_IMAGE = "http://image.tmdb.org/t/p";
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        // use async function inside useEffect to call on api to get results and reset state.
        const fetchMovies = async () =>  {
            const request = await axiosInstance.get(url);

            // We do this because api sometimes returns null for certain movie images.
            // If had own database would be easy. but too time consuming to do that.
            const filteredRequest = request.data.results.filter((item) => item.backdrop_path !== null);
            setMovies(filteredRequest);
        }
        fetchMovies();
    }, [url])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
    };

const handleClick = (item) => {
    if (trailerUrl) setTrailerUrl("")
    else {
        console.log(item)
        movieTrailer(item?.name || item.title || '').then((urlString) => {
           let url = new URL(urlString);
           let vParam = url.searchParams.get('v');
           setTrailerUrl(vParam);
        }).catch((err) => {
            console.log(err)
            setTrailerUrl("not available")
        })
    }
}

    return (
        <Container>
            <RowTitle>{rowTitle}</RowTitle>
            <RowContainer>
                {movies.map((item) => (
                    // if isLargeRow is passed with row we use poster img. if not we use backdrop image
                    <Img 
                        src={`${BASE_URL_IMAGE}/w500${item.poster_path}`} 
                        alt={item?.title || item?.name} key={item.id}
                        onClick={() => handleClick(item)}
                    />
                ))}
            </RowContainer>
            {trailerUrl 
            ? trailerUrl === "not available" 
            ? <SorryMessage>Sorry, this trailer is not available with the package this software is running.</SorryMessage> 
            : <YouTube videoId={trailerUrl} opts={opts} /> 
            : null } 
        </Container>
    )
}

export default Row;

/*
a way to change rows to backdrop "smaller" than largerow. However the backdrops don't have titles So i decided to be basicand have all the same.
<Img 
    src={`${BASE_URL_IMAGE}/w500${largeRow ? item.poster_path : item.backdrop_path}`} 
    alt={item?.title || item?.name} key={item.id}
    height={largeRow ? "250px" : "120px"}
    onClick={() => handleClick(item)}
/>
*/