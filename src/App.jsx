import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import Homepage from "./pages/homepage/Homepage";

import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";

// this is our first react project

function App() {
  const router = createBrowserRouter([
    // this is our first react project

    // <button className="googleLoginBtn" onClick={()=>navigate('/landing')}>Sign in with google</button>
    {
      path: "/", // Define a route for the root path
      element: <LandingPage />, // Render LandingPage at the root
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
