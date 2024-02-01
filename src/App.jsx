import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingPage";
import {RouterProvider, createBrowserRouter,
  // Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "landing",
      element: <LandingPage11 />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
  
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;