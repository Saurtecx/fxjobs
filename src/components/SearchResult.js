import React from "react";

const SearchResult = ({ jobs }) => {
  return (
    <div>
      {jobs.map((job, index) => (
        <div className="job-tile" key={index}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <a href={job.job_url} target="_blank" rel="noreferrer">
            Apply
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
