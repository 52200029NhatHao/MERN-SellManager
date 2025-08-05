import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT;
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
