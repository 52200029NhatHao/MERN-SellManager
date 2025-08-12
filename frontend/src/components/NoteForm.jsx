import React, { useEffect, useState } from "react";
import { SunMedium } from "lucide-react";

const NoteForm = ({ actionNote, selectedNote, action, hideModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isEditMode = action === "edit";

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("hahah");
    const currentNote = {
      ...(isEditMode && { _id: selectedNote._id }),
      title,
      content,
    };
    actionNote(currentNote);
    if (isEditMode) hideModal();
  };

  useEffect(() => {
    if (selectedNote && action === "edit") {
      console.log(selectedNote._id);
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [action, selectedNote]);
  return (
    <div className="bg-teal-900 rounded-xl shadow-lg flex justify-center items-center p-10 space-y-4 border-4 border-teal-950">
      <div className="note-form rounded-lg ">
        <span className="font-bold text-2xl">{action}</span>
        <form className="flex flex-col space-y-5 " onSubmit={submitForm}>
          <div className="flex space-x-4 justify-between">
            <label htmlFor="title">Title</label>
            <input
              className="input input-sm"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex space-x-4 justify-between">
            <label htmlFor="content">Content</label>
            <input
              className="input input-sm"
              id="content"
              name="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => hideModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-outline btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
