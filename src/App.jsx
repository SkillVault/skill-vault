import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import Homepage from "./pages/homepage/Homepage";

import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    // this is our first react project

    // <button className="googleLoginBtn" onClick={()=>navigate('/landing')}>Sign in with google</button>
    {
      path: "/",
      element: <LandingPage />,
    },
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
      // this is our first react project
    },
  
  ]);
  return (
    // <>
    //   <RouterProvider router={router} />
    // </>
    <Homepage />
  );
}

export default App;