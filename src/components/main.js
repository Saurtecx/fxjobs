import React, { useState , useEffect} from 'react';
import { Formik, Form } from 'formik';
import { Field, FieldArray } from "formik";
// import './main.css';





const initialValues = {
  jobType: '',
  role: '',
  skills: [],
  education: '',
  experience: '',
  workType: [],
  location: '',
  dreamCompany: ''
};

const validate = (values) => {
  const errors = {};

  if (!values.jobType) {
    errors.jobType = 'Required';
  }

  if (!values.role) {
    errors.role = 'Required';
  }

  if (!values.skills) {
    errors.skills = 'Required';
  }

  if (!values.education) {
    errors.education = 'Required';
  }

  if (!values.experience) {
    errors.experience = 'Required';
  }

  if (!values.workMode) {
    errors.workMode = 'Required';
  }

  if (!values.location) {
    errors.location = 'Required';
  }

  if (!values.dreamCompany) {
    errors.dreamCompany = 'Required';
  }

  return errors;
};



const PageZero = () => (
  <div>
    <h3>Are you looking for a job or an internship?</h3>
      <Field type="radio" name="jobType" value="job" />
      <label htmlFor="jobType">Job</label><br />
      <Field type="radio" name="jobType" value="internship" />
      <label htmlFor="jobType">Internship</label><br />
    </div>
);


const PageOne = () => (
  <>
    <h2>What role are you interested in?</h2>
    <label>
      <Field
        type="text"
        name="role"
        placeholder="Role"
      />
    </label>
  </>
);



const PageTwo = ({ onNext, onPrev }) => (
  <>
    <h2>Skills</h2>
    <FieldArray name="skills">
      {({ push, remove, form }) => (
        <>
          {form.values.skills.map((skill, index) => (
            <div className="skill-row" key={index}>
              <Field name={`skills[${index}]`} />
              <button
                type="button"
                className="remove-skill"
                onClick={() => remove(index)}
              >
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={() => push("")}>
            Add Skill
          </button>
        </>
      )}
    </FieldArray>
  </>
);






const PageThree = () => {
  return (
    <div>
      <h3>What is your highest level of education completed?</h3>
      <Field type="radio" name="education" value="High School" />
      <label htmlFor="education">High School</label><br />
      <Field type="radio" name="education" value="Associate's Degree" />
      <label htmlFor="education">Associate's Degree</label><br />
      <Field type="radio" name="education" value="Bachelor's Degree" />
      <label htmlFor="education">Bachelor's Degree</label><br />
      <Field type="radio" name="education" value="Master's Degree" />
      <label htmlFor="education">Master's Degree</label><br />
      <Field type="radio" name="education" value="Doctoral Degree" />
      <label htmlFor="education">Doctoral Degree</label><br />

    </div>
  );
};

const PageFour = () => {
  return (
    <div>
      <h3>How many years of experience do you have?</h3>
      <Field type="text" name="experience" />
    </div>
  );
};

const PageFive = () => {
  return (
    <div>
      <h3>What type of work are you interested in?</h3>
      <Field type="checkbox" name="workType" value="Full-Time" />
      <label htmlFor="workType">Full-Time</label><br />
      <Field type="checkbox" name="workType" value="Part-Time" />
      <label htmlFor="workType">Part-Time</label><br />
      <Field type="checkbox" name="workType" value="Contract" />
      <label htmlFor="workType">Contract</label><br />
      <Field type="checkbox" name="workType" value="Freelance" />
      <label htmlFor="workType">Freelance</label><br />

    </div>
  );
};

const PageSix = () => {
  return (
    <div>
      <h3>Where are you looking to work?</h3>
      <Field type="text" name="location" placeholder="Location" />
    </div>
  );
};



const PageSeven = () => {
  return (
    <>
      <h2>What is your dream company?</h2>
      <div>
        <Field
          name="dreamCompany"
          type="text"
          placeholder="Enter dream company"
        />
      </div>
    </>
  );
};

// const Schema = mongoose.Schema;

// const jobSchema = new Schema({
//   ID: Number,
//   TITLE: String,
//   COMPANY: String,
//   LOCATION: String,
//   "#Applicants": String,
//   DatePosted: String,
//   JobURL: String,
//   CompanyURL: String,
//   DateDownloaded: { type: Date, default: Date.now }
// });

// const Job = mongoose.model('Job', jobSchema);






const PageNine = (values) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://152.58.153.29:5000/jobs/${values.role}/${values.location}`);
      const data = await response.json();
      setJobs(data);
    };
    fetchData();
  }, [values.role,values.location]);

  return (
    <div>
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
    </div>
  );
};



const MultiPageForm = () => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };
  
  // const handleSubmit = (values) => {
  //   console.log(values);
  //   fetch('http://localhost:5000/submitdata', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      // onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Form>
          {page === 0 && (
            <PageZero
              onNext={handleNext}
              disabled={!values.jobType}
            />
          )}
          {page === 1 && (
            <PageOne
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.role}
            />
          )}
          {page === 2 && (
            <PageTwo
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.skills}
            />
          )}
          {page === 3 && (
            <PageThree
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.education}
            />
          )}
          {page === 4 && (
            <PageFour
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.experience}
            />
          )}
          {page === 5 && (
            <PageFive
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.workType}
            />
          )}
          {page === 6 && (
            <PageSix
              onNext={handleNext}
              onPrev={handlePrev}
              disabled={!values.location}
            />
          )}
          {page === 7 && (
            <PageSeven
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
         {page === 8 && (
          <PageNine
             role={values.role}
             location={values.location}
            onPrev={handlePrev}
          />
        )}
          
          {page !== 0 && (
            <button type="button" onClick={handlePrev}>
              Previous
            </button>
          )}
          {page !== 7 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={
                (page === 0 && !values.jobType) ||
                (page === 1 && !values.role) ||
                (page === 2 && !values.skills) ||
                (page === 3 && !values.education) ||
                (page === 4 && !values.experience) ||
                (page === 5 && !values.workType) ||
                (page === 6 && !values.location) ||
                (page === 7 && !values.dreamCompany)
              }
            >
              Next
            </button>
          )}
          {page === 7 && (
            <button
            onClick={handleNext}
              type="submit"
            >
              Submit
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
  }
  
  export default MultiPageForm;