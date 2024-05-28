/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])

  const cardsRef = useRef();

  // API
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTA2ZGY1M2VmNDJlNTFhN2I1OTRmZDJjNzhiMTZiOCIsInN1YiI6IjY2NTMzOTFjMDE4Mjk1MjZlMTA5MDcyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFwBtFNmafbzY7K34Ypy37BOI__sGGZ2ftTfo_GkIko'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  
 
  useEffect(() => {

    //API call
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

     // allows user to scroll horizontally
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title? title: 'Popular on Netflix' }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
