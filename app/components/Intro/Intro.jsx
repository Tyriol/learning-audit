"use client";
import { AuthContext } from "@/app/context/authContext";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import NewModuleForm from "../FormsSections/NewModuleForm/NewModuleForm";

export default function Intro() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return <p>Loading your information...</p>;

  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <h2>Hey again {user.username}</h2>
      <p>What are you going to focus on today</p>
      <p>Or would you like to...</p>
      <button type="button" onClick={handleClick}>
        Add a new module
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add a new module">
        <NewModuleForm />
      </Modal>
    </>
  );
}
