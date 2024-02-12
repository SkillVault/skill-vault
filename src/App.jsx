import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingpage/LandingPage";
import Homepage from "./pages/homepage/Homepage";
import ContactPage from "./pages/contactpage/contactpage";

import {
  RouterProvider,
  createBrowserRouter,
  // Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
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
    {
      path: "contact",
      element: <ContactPage />
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
