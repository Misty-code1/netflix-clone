import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Player = () => {
  //FOR GETTING MOVIE ID THROUGH URL
  const { id } = useParams();

  //BACK NAVIGATION
  // const navigate = useNavigate();

  //GETTING AND SETTING DATA STATES
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  //MOVIE API REQUEST METHOD
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTA2ZGY1M2VmNDJlNTFhN2I1OTRmZDJjNzhiMTZiOCIsInN1YiI6IjY2NTMzOTFjMDE4Mjk1MjZlMTA5MDcyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MFwBtFNmafbzY7K34Ypy37BOI__sGGZ2ftTfo_GkIko",
    },
  };

  useEffect(() => {
    //MOVIE API REQUEST
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <Link to="/">
        <img
          src={back_arrow_icon}
          alt=""
          // onClick={()=>{navigate(-2)}}
        />
      </Link>

      <iframe
        src={`https://www.youtube.com/embed/${apiData.key}`}
        width="90%"
        height="90%"
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
