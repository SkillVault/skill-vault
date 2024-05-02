import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
   
    <GoogleOAuthProvider clientId="109725098981-becg76b1emp5dnji0n1tla3j43743lgn.apps.googleusercontent.com">
      {" "}
      {/* Provide your Google Client ID here */}
      <App />
    </GoogleOAuthProvider>
);
