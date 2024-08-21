import React from "react";
import {Main} from "../components/Main.js";
import Login from "@/app/components/Login";
import Dashboard from "@/app/components/Dashboard";
export const metadata = {
  title: "MoodLog ⋅ Dashboard"
};

export default function DashboardPage () {
  const isAuthenticated = false;
  let children = (
    <Login />
  )
  if (isAuthenticated) {
    children = (
    <Dashboard/>
    )
  }
  return (
    <Main>
      {children}      
    </Main>
  )
}