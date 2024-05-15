import React from "react";
import "./aboutpage.css";
import "bootstrap/dist/css/bootstrap.css";
import LandingNavbar from "../components/LandingNav/LandingNav";


const AboutPage = () => {




  return (
    <div>  <LandingNavbar />
    <div className="about-page">
       
      <div className="about-container">
       
     
      <div className="about-comp">
        <div className="about-comp-inside">
          <div className="about-comp-div"></div>
          <img src="./src/assets/logo.png" />
          <h3 className="about-comp-div-h3">SkillVault</h3>
          <p className="about-comp-div-p">
            We connect top talents with top about-companies
          </p>
        </div>

        <div className="about-comp1-div">
          <button>Skills Test</button>
          <p>The skill test feature enables users to assess and demonstrate their
             proficiency in specific skills or subjects relevant to their career aspirations. 
             Users can choose from a variety of skill categories, such as programming languages,
              soft skills, or industry-specific knowledge, and take timed assessments about-composed 
              of multiple-choice or open-ended questions. Upon about-completing a test, users receive 
              instant feedback on their performance, including scores, correct answers, and areas
              for improvement. The skill test feature provides users with valuable insights into 
              their strengths and weaknesses, allowing them to tailor their learning and preparation
              strategies accordingly. Additionally, users can track their progress over time and 
              benchmark their skills against industry standards, enhancing their confidence and readiness 
              for real-world challenges such as job interviews and professional certifications.</p>
        </div>

<div className="about-comp1-div">
          <button>Job Connect</button>
          <p>The job postings and applying feature streamlines the job search and application process for users 
            on the platform. about-Companies can post job openings with detailed descriptions, including job title, 
            responsibilities, qualifications, and application deadlines. Users can browse through these listings,
            filter based on their preferences, and apply directly through the platform. Upon applying, users can track 
            the status of their applications and receive notifications on any updates or responses from about-companies. 
            This feature simplifies the job search experience, providing users with access to a wide range of opportunities
            and facilitating seamless communication between candidates and hiring about-companies.</p>
        </div>

        <div className="about-comp1-div">
          <button>Public Profile</button>
          <p>The public profile feature allows users to showcase their professional identity and acabout-complishments to
              potential employers and peers. Users can create personalized profiles containing key information such 
              as their education, work experience, skills, and achievements. These profiles serve as an online resume,
              providing a about-comprehensive overview of the user's background and expertise. Users can customize their profiles
              with profile pictures, cover photos, and links to their social media or professional websites. By making their
              profiles public, users increase their visibility and credibility within the platform's community, enhancing their
              chances of networking, career opportunities, and professional growth.</p>
        </div>

       </div>
       </div>
       </div>
       </div>
       
  );
};

export default AboutPage;