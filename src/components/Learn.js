import React, { useState } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "./Learn.css";

const SearchResults = () => {
  const [search, setSearch] = useState("");
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [udemyResults, setUdemyResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${search}&part=snippet&maxResults=10&type=video&key=AIzaSyAldA6wXJepTALJh70XbHMh6FN5kim56Jc`
      );
      setYoutubeResults(youtubeResponse.data.items);

      const udemyResponse = await axios.get(
        `https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor/course-url?search=${search}`,
        {
          headers: {
            'X-RapidAPI-Key': 'b88c8f5bd4msh9561237e0e77075p1278a9jsneabe9c8398cd',
            'X-RapidAPI-Host': 'udemy-course-scrapper-api.p.rapidapi.com'
          }
        }
      );
      setUdemyResults(udemyResponse.data);

      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Search Video content</h2>
      <div className="search-container">
        <label htmlFor="searchInput">Search:</label>
        <input
          type="text"
          id="searchInput"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showResults && (
        <>
          <div className="youtube-results">
            <h3>YouTube Results</h3>
            {youtubeResults.map((item) => (
              <div className="video-card" key={item.id.videoId}>
                <YouTube videoId={item.id.videoId} />
                <div className="video-details">
                  <h4>{item.snippet.title}</h4>
                  <p>{item.snippet.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="udemy-results">
            <h3>Udemy Results</h3>
            {Array.isArray(udemyResults) && udemyResults.map((item) => (
                <div className="course-card" key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.headline}</p>
                </div>
            ))}
         </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;
