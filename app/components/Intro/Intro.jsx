"use client";
import { AuthContext } from "@/app/context/authContext";
import { useContext } from "react";
import NewModuleForm from "../FormsSections/NewModuleForm/NewModuleForm";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";
import Modal from "../Modal/Modal";

export default function Intro() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Loading your information...</p>;

  return (
    <>
      <h2>Hey again {user.username}</h2>
      <p>What are you going to focus on today?</p>
      <p>Or would you like to...</p>
      <div className="button-container">
        <Modal title="Add a Module" openButtonText="Add a module" closeButtonText="Finished">
          <NewModuleForm />
        </Modal>
        <Modal title="Add a Learning" openButtonText="Add a learning" closeButtonText="Finished">
          <NewLearningForm />
        </Modal>
      </div>
    </>
  );
}
