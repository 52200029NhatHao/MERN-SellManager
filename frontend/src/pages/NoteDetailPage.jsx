import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);

        if (res.status !== 200) {
          console.log("Error fetching data:", res);
          return;
        }
        setNote(res.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchNote();
  }, [id]);
  if (!note) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container flex flex-col justyfy-center items-center p-5 w-fit space-y-4 rounded-lg bg-teal-900">
        <div className="flex flex-row space-x-5 justify-between">
          <span className="font-bold text-2xl">Title</span>
          <span className="text-2xl">{note.title}</span>
        </div>
        <div className="flex flex-row space-x-5 justify-between">
          <span className="font-bold text-2xl">Content</span>
          <p className="text-2xl">{note.content}</p>
        </div>
        <div className="flex flex-row space-x-5 justify-between">
          <span className="font-bold text-2xl">Create At</span>
          <span className="text-2xl">{note.title}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
