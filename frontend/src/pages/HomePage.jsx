import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteForm from "../components/NoteForm";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const toggleModal = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };
  const hideModal = () => {
    setSelectedNote();
    setShowModal(false);
  };

  const deleteNote = async (_id) => {
    const res = await fetch(`http://localhost:5000/api/notes/${_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
      toast.success("Updated successfully");
      return;
    } else {
      toast.error("Delete failed");
    }
  };

  const updateNote = async (note) => {
    const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n._id === note._id
          ? { ...n, title: note.title, content: note.content }
          : n
      )
    );
    toast.success("Updated successfully");
    return;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes: ", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary">Loading notes...</div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                toggleModal={toggleModal}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        )}
      </div>
      {showModal && (
        <div
          id="addNoteModal"
          className="fixed top-0 h-screen w-screen z-100 backdrop-brightness-50 flex justify-center items-center"
        >
          <NoteForm
            actionNote={updateNote}
            selectedNote={selectedNote}
            action="edit"
            hideModal={hideModal}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
