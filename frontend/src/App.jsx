import React from "react";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Route, Routes } from "react-router";
import NoteForm from "./components/NoteForm";
// import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
