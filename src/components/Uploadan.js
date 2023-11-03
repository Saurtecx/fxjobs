import React, { useState } from "react";
import axios from "axios";
import "./main.css";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import {Puff} from "react-loader-spinner";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setSearched(false);
    setTimeout(async () => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://127.0.0.1:5000/jobs/analyse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      setScore(data.score);
      setSearched(true);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div>
      {searched ? (
        <div className="score-container">
          <h2 className="yscr">You Scored</h2>
          <div className="progress-bar-container">
            <CircularProgressbarWithChildren
              value={score}
              strokeWidth={10}
              styles={{
                path: { stroke: 'rgb(40, 142, 135)' },
                text: { fill: '#0f0', fontSize: '40px' },
              }}
            >
              <h2>{score}</h2>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      ) : (
        <div className="search-page">
          {!isLoading && (
            <div className="upload-form">
              <h1>Analyse Page</h1>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleSearch}>Analyse</button>
            </div>
          )}
          {isLoading && (
            <div className="loader">
            <div className="loader">
            <Puff className="pp" color="rgb(168, 226, 222)" size={100} />
          </div>
              <h2 className="loading-text">Analysing your Resume...</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
