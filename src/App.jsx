import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import JobSearch from  "./pages/JobSeach";
import {RouterProvider, createBrowserRouter

  // Navigate,
} from "react-router-dom";
import { SignIn } from "phosphor-react";
import Homepage from "./pages/homepage/Homepage";



// this is our first react project

function App() {
  const router = createBrowserRouter([
    // this is our first react project

    <button className="googleLoginBtn" onClick={()=>navigate('/landing')}>Sign in with google</button>,
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "landing",
      element: <LandingPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
      // this is our first react project
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
  // this is our first react project
}

export default App;
