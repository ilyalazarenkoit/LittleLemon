// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Nav from "./components/Navigation.tsx";
import HomePage from "./components/HomePage.tsx";
import BookingPage from "./components/BookingPage.tsx";
import ConfirmedBooking from "./components/ConfirmedBooking.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          <Route
            path="/menu"
            element={
              <div className="container">
                <h1>Menu Page</h1>
                <p>Coming soon...</p>
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="container">
                <h1>About Page</h1>
                <p>Coming soon...</p>
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
