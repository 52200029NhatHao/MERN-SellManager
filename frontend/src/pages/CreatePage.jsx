import React from "react";
import NoteForm from "../components/NoteForm";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreatePage = () => {
  const navigate = useNavigate();
  const createNote = async (note) => {
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    toast.success("Created Successfully");
    navigate("/");
  };
  return (
    <div className="container flex flex-col space-y-10 justify-center items-center h-screen">
      <span className="text-4xl font-bold">Create a new Note</span>
      <NoteForm actionNote={createNote} />
    </div>
  );
};

export default CreatePage;
