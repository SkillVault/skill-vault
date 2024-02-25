import { useNavigate } from "react-router-dom"; // Import the navigate function

import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import JobSearch from "./pages/jobsearch/JobSearch"; // Corrected typo
import ProfilePage from "./pages/profilepage/ProfilePage";
import ContactPage from "./pages/contactpage/ContactPage"; // Corrected typo
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignIn } from "phosphor-react";
import MockInterview from "./pages/MockInterview"
import Homepage from "./pages/homepage/Homepage";
import CompanySignupPage from "./pages/companySignup/CompanySignupPage";

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
      element: <LoginPage />,
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
