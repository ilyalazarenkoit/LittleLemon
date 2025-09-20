// HomePage.js
import React from "react";
import CallToAction from "./CallToAction.tsx";
import Specials from "./Specials.tsx";
import CustomersSay from "./CustomersSay.tsx";
import Chicago from "./Chicago.tsx";

function HomePage() {
  return (
    <main>
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
    </main>
  );
}

export default HomePage;
