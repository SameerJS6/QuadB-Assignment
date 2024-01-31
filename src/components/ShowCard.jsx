/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import NotFound from "../assets/not-found.jpg";

export default function ShowCard({
  id,
  name,
  genres,
  premiered,
  image,
  rating,
}) {
  const formattedGenres = genres.length > 1 ? genres.join(", ") : genres;
  const formattedYear = premiered?.slice(0, 4);

  const poster = image === null ? NotFound : image?.medium;

  return (
    <Link to={`/summary/${id}`} className="show-card card-wrapper">
      <img className="card-poster" src={poster} alt={`${name} Poster`} />

      <div className="show-card-details">
        <div className="card-title-wrapper">
          <h3>{name}</h3>

          <div
            className="rating-wrapper"
            style={{
              fontStyle: rating?.average === null ? "italic" : "normal",
            }}
          >
            {rating?.average === null ? (
              <span className="material-symbols-rounded icon-sm error">
                priority_high
              </span>
            ) : (
              <span className="material-symbols-rounded filled icon-sm">
                star
              </span>
            )}
            {rating?.average === null ? (
              <span className="text-xs">No Rating</span>
            ) : (
              <span className="text-xs">{rating?.average}/10</span>
            )}
          </div>
        </div>

        <div className="sub-detail-wrapper">
          <p className="text-sm text-muted">
            <b>Genere:</b> {formattedGenres}
          </p>

          <p
            className="text-sm text-muted"
            style={{ fontStyle: premiered === null ? "italic" : "normal" }}
          >
            <b>Release Year:</b> {premiered === null ? "Null" : formattedYear}
          </p>
        </div>

        <Link to={`/summary/${id}`} className="redirect-btn text-sm">
          Know More
          <span className="material-symbols-rounded icon-sm">north_east</span>
        </Link>
      </div>
    </Link>
  );
}
