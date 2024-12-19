import express from "express";
import dotenv from "dotenv";
import getRouter from "./routes/tasks.js";
import logger from "./middleware/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger);
app.use("/tasks", getRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
