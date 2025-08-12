import { CloudCog, PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const NoteCard = ({ note, toggleModal, deleteNote }) => {
  const deleteOnClick = () => {
    const isConfirmed = window.confirm("Are you sure to delete this note?");
    if (!isConfirmed) return;
    deleteNote(note._id);
  };
  const formatDate = (date) => {
    date = new Date(date);
    const formatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatted;
  };
  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-[#00FF9D] p-6 space-y-5"
    >
      <Link
        to={`/note/${note._id}`}
        className="flex flex-col space-y-1 min-w-full"
      >
        <div className="font-bold text-2xl">{note.title}</div>
        <div className="text-gray-600">{note.content.toUpperCase()}</div>
      </Link>
      <div className="flex flex-row justify-between">
        <div className="text-gray-600">{formatDate(note.createdAt)}</div>
        <div className="flex flex-row space-x-5 items-center justify-center">
          <button id={note._id} onClick={() => toggleModal(note)}>
            <PenSquareIcon className="size-4" />
          </button>
          <button onClick={deleteOnClick}>
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const noteLoader = async ({ params }) => {
  const res = await fetch(`/api/notes/${params.id}`);
  const data = await res.json();
  return data;
};
export { NoteCard as default, noteLoader };
