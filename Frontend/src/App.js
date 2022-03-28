import React from "react";
import ScrollToTop from "./components/scrollToTop";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // to hide /browse from people not logged in we would need to set up
  // Redux and stor a user variable. Then use a condition to when
  // rendering If true then display. If not then redirect to register/sign-in page.
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
