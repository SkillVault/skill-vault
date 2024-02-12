import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import JobSearch from  "./pages/JobSeach";
import ProfilePage from "./pages/profilepage/ProfilePage";
import {RouterProvider, createBrowserRouter

  // Navigate,
} from "react-router-dom";
import { SignIn } from "phosphor-react";
import Homepage from "./pages/homepage/Homepage";



function App() {
  const router = createBrowserRouter([
    // this is our first react project

    <button className="googleLoginBtn" onClick={()=>navigate('/landing')}>Sign in with google</button>,
    {
      path: "/",
      element: < LandingPage />,
    },
    {
      path: "landing",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "jobsearch",
      element: <JobSearch />,
      // this is our first react project
    },
    {
      path: "homepage",
      element: <Homepage />,
    },
    {
      path: "profilepage",
      element: <ProfilePage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
