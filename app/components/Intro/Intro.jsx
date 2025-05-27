"use client";
import { AuthContext } from "@/app/context/authContext";
import { useContext } from "react";
import NewModuleForm from "../FormsSections/NewModuleForm/NewModuleForm";
import Modal from "../Modal/Modal";

export default function Intro() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading your information...</p>;

  return (
    <>
      <h2>Hey again {user.username}</h2>
      <p>What are you going to focus on today</p>
      <p>Or would you like to...</p>
      <Modal openButtonText="Add a new module" closeButtonText="Finished">
        <NewModuleForm />
      </Modal>
    </>
  );
}
