import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingPage";
import {RouterProvider, createBrowserRouter,
  // Navigate,
} from "react-router-dom";

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
}

export default App;