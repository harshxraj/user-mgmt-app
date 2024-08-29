import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("sg");
});

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  connection();
  console.log(`Connected on port ${PORT}`);
});
