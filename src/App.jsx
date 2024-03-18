import { useNavigate } from "react-router-dom"; // Import the navigate function

import JobSearch from "./pages/jobsearch/JobSearch"; // Corrected typo
import ProfilePage from "./pages/profilepage/ProfilePage";
import ContactPage from "./pages/contactpage/ContactPage"; // Corrected typo
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignIn } from "phosphor-react";
import LandingPage from "./pages/landingpage/LandingPage"
import MockInterview from "./pages/mockinterview/MockInterview"
import Homepage from "./pages/homepage/Homepage";
import CompanySignupPage from "./pages/companySignup/CompanySignupPage";
import CandidateSignupPage from "./pages/candidateSignup/CandidateSignupPage";
import Skill from "./pages/skill/Skill";
import CompLanding from "./pages/complanding/CompLanding";
import AddJob from "./pages/addjob/AddJob";
import JobEntry from "./pages/jobentry/JobEntry";

function App() {
  const router = createBrowserRouter([
    <button
      className="googleLoginBtn"
      onClick={() => navigate("/landing")}
    >
      Sign in with google
    </button>,
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "landing",
      element: <LandingPage />,
    },
    {
      path: "candidate/login",
      element: <CandidateSignupPage />,
    },
    {
      path: "jobsearch",
      element: <JobSearch />,
    },
    {
      path: "homepage",
      element: <Homepage />,
    },
    {
      path: "profilepage",
      element: <ProfilePage />,
    },
    {
      path: "company/login",
      element: <CompanySignupPage />,
    },
    {
      path: "company/signup",
      element: <CompanySignupPage />,
    },
    {
      path: "contactpage",
      element: <ContactPage />,
    },
    {
      path: "mockinterview",
      element: <MockInterview/>
    },
    {
      path: "skill",
      element: <Skill/>
    },
    {
      path: "complanding",
      element: <CompLanding/>
    },
    {
      path: "addjob",
      element: <AddJob/>
    },
    {
      path: "jobentry",
      element: <JobEntry/>
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
