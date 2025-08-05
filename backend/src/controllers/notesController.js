import Note from "../models/Node.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.log(`Error fetching data: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNote = async (req, res) => {};

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
    Note.create({ newNote });
    res.status(201).json({ newNote });
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.status(401).json({ message: "Bad request" });
  }
};

export const updateNote = (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Invalid title or content" });
    }
    const updateNote = Note(title, content);
    Note.findByIdAndUpdate(req.params.id, updateNote);
    res
      .status(201)
      .json({ message: "Note updated successfully" }, { updateNote });
  } catch (error) {}
};

export const deleteNote = (req, res) => {};
