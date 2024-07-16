// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewLanding from "./components/NewLanding";
import Profile from "./Routes/Profile";
import Home from "./Routes/Homepage";
import { requestPermission, onMessageListener } from "./firebase"; // Import the functions
import registerServiceWorker from "./serviceWorkerRegistration"; // Import the service worker registration

function Apps() {
  useEffect(() => {
    registerServiceWorker(); // Register the service worker
  }, []);

  useEffect(() => {
    requestPermission(); // Request permission for notifications

    // Listen for incoming messages
    onMessageListener()
      .then((payload) => {
        console.log("Message received. ", payload);
        // Customize notification handling here if needed
      })
      .catch((err) => {
        console.log("Failed to receive message. ", err);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewLanding />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profiles" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default Apps;
