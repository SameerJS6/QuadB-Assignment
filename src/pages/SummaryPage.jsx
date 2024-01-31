import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NotFound from "../assets/not-found.jpg";
import "../styles/summary.css";
import { formatDate } from "../utils/util";
import Spinner from "../components/Spinner";

export default function SummaryPage() {
  const [show, setShow] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const fetchIndividualShow = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data = await response.json();
      setShow(data);
    } catch (error) {
      console.log("Error while fetching individual show: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIndividualShow();
  }, []);

  if (isLoading)
    return (
      <div className="centered">
        <Spinner />
      </div>
    );

  const ReleaseData = formatDate(show?.premiered);
  const endDate = formatDate(show?.ended);
  return (
    <>
      <main className="summary-container">
        <div>
          <Link to="../" className="back-btn">
            <span className="material-symbols-rounded icon-md">arrow_back</span>
            Go Back
          </Link>
        </div>

        <div className="summary-wrapper">
          <div>
            <img
              src={show?.image === null ? NotFound : show?.image?.original}
              className="main-poster"
            />
          </div>

          <div className="summary-content-wrapper">
            <div className="gap-2">
              <div>
                <div className="card-title-wrapper p-0">
                  <h1 className="main-title">{show?.name}</h1>

                  <div
                    className="rating-wrapper"
                    style={{
                      fontStyle:
                        show?.rating?.average === null ? "italic" : "normal",
                    }}
                  >
                    {show?.rating?.average === null ? (
                      <span className="material-symbols-rounded icon-sm error">
                        priority_high
                      </span>
                    ) : (
                      <span className="material-symbols-rounded filled icon-sm">
                        star
                      </span>
                    )}
                    {show?.rating?.average === null ? (
                      <span className="text-xs">No Rating</span>
                    ) : (
                      <span className="text-xs">
                        {show?.rating?.average}/10
                      </span>
                    )}
                  </div>
                </div>

                {show?.status === "In Development" ? (
                  <p
                    className="relased-title text-xs text-muted"
                    style={{ fontStyle: "italic" }}
                  >
                    {show?.status}
                  </p>
                ) : (
                  <p className="relased-title text-xs text-muted">
                    {ReleaseData} - {show?.ended === null ? "Present" : endDate}
                  </p>
                )}
              </div>

              <div className="card-title-wrapper p-0">
                <p className="text-sm">
                  {show?.type === "Scripted" ? "TV Series" : show?.type}
                </p>
                <div className="rating-wrapper text-xs text-white">
                  <span className="material-symbols-rounded icon-sm">
                    translate
                  </span>
                  <p>{show?.language}</p>
                </div>
              </div>
            </div>

            <div className="summary-text">
              <p className="text-md text-muted">Summary</p>
              <p
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: show?.summary }}
              />
              <button className="book-ticket-btn text-sm">
                Book Ticket
                <span className="material-symbols-rounded icon-sm">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
