import cors from "cors";
import express from "express";
import postRouter from "./routers/post.router.js";
import sequelize from "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json(), cors());

try {
  await sequelize.authenticate();
  console.log("DB Verbindung erfolgreich!");
  await sequelize.sync();
} catch (error) {
  console.error("Fehler bei der DB-Verbindung:", error);
}

app.use("/posts", postRouter);

app.listen(port, () => console.log(`Sequelize Server läuft auf port ${port}`));
