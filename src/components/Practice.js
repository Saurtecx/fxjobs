import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Practice.css";

const Practice = () => {
  const [contests, setContests] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      const response = await axios.get("https://kontests.net/api/v1/all");
      setContests(response.data);
    };
    fetchContests();
  }, []);

  const handleSiteSelect = (site) => {
    if (selectedSites.includes(site)) {
      setSelectedSites(selectedSites.filter((s) => s !== site));
    } else {
      setSelectedSites([...selectedSites, site]);
    }
  };

  const filteredContests = contests.filter(
    (contest) =>
      contest.status === "BEFORE" &&
      (selectedSites.length === 0 || selectedSites.includes(contest.site))
  );

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const formatDuration = (duration) => {
    if (duration <= 0) {
      return "Ongoing";
    }
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="practice-container">
      <div className="site-filter-container">
        <h2 className="site-filter-heading">Select Sites:</h2>
        <ul className="site-filter-list">
          {Array.from(
            new Set(contests.map((contest) => contest.site))
          ).map((site) => (
            <li
              key={site}
              className={`site-filter-item ${
                selectedSites.includes(site) && "selected"
              }`}
              onClick={() => handleSiteSelect(site)}
            >
              {site}
            </li>
          ))}
        </ul>
      </div>
      <h2 className="practice-heading">Upcoming Contests:</h2>
      {filteredContests.length === 0 ? (
        <p>No upcoming contests.</p>
      ) : (
        <ul className="practice-list">
          {filteredContests.map((contest) => (
            <li key={contest.id} className="practice-item">
              <div className="contest-card">
                <h3 className="contest-name">{contest.name}</h3>
                <p className="contest-info">{contest.site}</p>
                <p className="contest-info">
                  Start Time: {formatTime(contest.start_time)}
                </p>
                <p className="contest-info">
                  Duration: {formatDuration(contest.duration)}
                </p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contest-link"
                >
                  Go to Contest Page
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Practice;
