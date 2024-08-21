import React from "react";
import DashboardPage from "./dashboard/page.js";
import {Main} from "./components/Main.js";
import Hero from "@/app/components/Hero";
export default function HomePage() {
  return (
      <Main> 
          <Hero/>
          <DashboardPage />
      </Main>
  );
}
