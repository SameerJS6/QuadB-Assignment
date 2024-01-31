import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShows = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error("Error while fetching shows: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="home-container">
      {shows.map((show) => {
        return <ShowCard key={show?.show.id} {...show.show} />;
      })}
    </main>
  );
}
