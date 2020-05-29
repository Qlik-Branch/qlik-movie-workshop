import React, { useState } from "react"
import moreInfo from "../assets/more-info.svg"
import "./Movie.css"
import moviePlaceholder from "../assets/movie-placeholder.png"

const Movie = props => {
  const [showDetails, setShowDetails] = useState(false)

  const {
    movie_title,
    title_year,
    poster_url,
    content_rating,
    country,
    language,
    director_name,
    actor_1_name,
    actor_2_name,
    actor_3_name
  } = props.movie
  const actors = [actor_1_name, actor_2_name, actor_3_name]
    .filter(actor => actor != null && actor !== "")
    .join(", ")

  const addDefaultSrc = ev => {
    ev.target.src = moviePlaceholder
  }

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="Movie">
      <div className="poster">
        <img src={poster_url} alt={movie_title} onError={addDefaultSrc} />
      </div>
      <div className="details">
        <div className="mainDetails">
          <div className="title">{movie_title}</div>
          <div className="subDetails">
            {director_name} - {title_year}
          </div>
        </div>
        <div className="moreDetails">
          {showDetails ? (
            <div className="moreDetailsPane">
              <label for="contentRating">Rating</label>
              <div id="contentRating">{content_rating}</div>
              <label for="country">Country</label>
              <div id="country">{country}</div>
              <label for="language">Language</label>
              <div id="language">{language}</div>
              <label for="director">Director</label>
              <div id="director">{director_name}</div>
              <label for="actors">Actors</label>
              <div id="actors">{actors}</div>
            </div>
          ) : null}
          <img src={moreInfo} alt="More Details" onClick={toggleShowDetails} />
        </div>
      </div>
    </div>
  )
}

export default Movie
