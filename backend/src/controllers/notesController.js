import Note from "../models/Node.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note)
      return res
        .status(404)
        .json({ message: `Note with id of ${req.params.id} was not found` });
    res.status(200).json(note);
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(title, content);
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Please include title and content" });
    }
    const newNote = await Note.create({ title, content });
    res.status(201).json({ newNote });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(401).json({ message: "Bad request" });
  }
};

export const updateNote = async (req, res) => {
  try {
    console.log("haha");
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Invalid title or content" });
    }
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updateNote)
      return res
        .status(404)
        .json({ message: `Note with id of ${req.params.id} is not found` });
    res.status(201).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Something went wrong: ", error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id);
    if (!deleteNote)
      return res
        .status(404)
        .json({ message: `Note with id of ${req.params.id} was not found` });
    res.status(200).json("Note deleted successfully");
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
