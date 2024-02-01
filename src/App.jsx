import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingPage";
import {RouterProvider, createBrowserRouter,
  // Navigate,
} from "react-router-dom";

// this is our first react project

function App() {
  const router = createBrowserRouter([
    // this is our first react project
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
  
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
  // this is our first react project
}

export default App;
