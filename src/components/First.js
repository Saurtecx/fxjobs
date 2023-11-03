import React, { useState } from "react";
import Main from "./main";
import UploadPage from "./Upload"
import "./main.css"
import "./First.css"
import Uploadan from "./Uploadan"
import Learn from "./Learn"
import Practice from "./Practice"

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState('');

  const handleEnterDetails = () => {
    setCurrentPage('main');
  };

  const handleUploadResume = () => {
    setCurrentPage('upload');
  };

  const handleAnalyseResume = () => {
    setCurrentPage('uploadan');
    // handle clicking the "Analyse" button here
  };

  const handleLearn = () => {
    setCurrentPage('learn');
  }

  const handlePractice = () =>{
    setCurrentPage('practice')
  }

  return (
    <div>
      <div className="career-container">
        <h2>ViकाS</h2>
        <p>A career development site</p>
      </div>

      {currentPage === '' && (
        <>
        <div className="header">
        <button className="learn-button" onClick={handleLearn}>Learn</button>
        <button className="practice-button" onClick={handlePractice}>Practice</button>
        <button className="analyse-button" onClick={handleAnalyseResume}>Analyse Resume</button>
      </div>
      
        <div className="gtop">
          <h1>Get your Career started!</h1>
          <button onClick={handleEnterDetails}>Enter Details</button>
          <button onClick={handleUploadResume}>Upload Resume</button>
        </div>
        </>
      )}
      {currentPage === 'main' && <Main />}
      {currentPage === 'upload' && <UploadPage />}
      {currentPage === 'uploadan' && <Uploadan />}
      {currentPage === 'learn' && <Learn/>}
      {currentPage === 'practice' && <Practice/> }
    </div>
  );
};

export default MainPage;
