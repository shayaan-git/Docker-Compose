import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
   res.send(`This is Docker Compose Concept Class`);
});

app.get("/api/greet", (req, res) => {
   const data = {
      message: "Welcome to Engineering Shayaan",
   };
   res.json(data);
});

app.get("/api/users", (req, res) => {
   const users = [
      { id: 1, name: "Ankur" },
      { id: 2, name: "Shayaan" },
      { id: 3, name: "Maddy" },
      { id: 4, name: "Debian" },
   ];
   res.status(200).json(users);
});

app.get("/api/health", (req, res) => {
   res.status(200).json({ status: "OK" });
});

app.get("*name", (req, res) => {
   res.sendFile("public/index.html", { root: __dirname });
});

app.listen(3000, () => {
   console.log(`Server is runnning on port http://localhost:3000`);
});
