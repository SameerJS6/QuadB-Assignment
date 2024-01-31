import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      SummaryPage {id}
      <img src={show?.image?.original} />
      <p>{show.name}</p>
    </div>
  );
}
