import React, { useState } from "react";
import axios from "axios";
import SearchResult from "./SearchResult";
import './main.css'

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSearch = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://127.0.0.1:5000/jobs/search", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    const data = response.data;
    setJobs(data);
    setSearched(true);
  };

  return (
    <div>
      {searched ? (
        <SearchResult jobs={jobs} />
      ) : (
        <div className="gtop">
          <h2>Upload Your Resume</h2>
          <input type="file" onChange={handleFileChange} />
          <br />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
