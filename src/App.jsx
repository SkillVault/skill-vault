import LoginPage from "./pages/loginpage/LoginPage";
import LandingPage from "./pages/landingPage";
import {RouterProvider, createBrowserRouter,
  // Navigate,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "landing",
      element: <LandingPage />,
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
