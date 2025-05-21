"use client";
import { AuthContext } from "@/app/context/authContext";
import { useContext } from "react";

export default function Intro() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h2>Hey again {user.username}</h2>
      <p>What are you going to focus on today</p>
      <p>Or would you like to...</p>
      <button>Add a new module</button>
    </>
  );
}
