import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success from backend" });
});
app.get("/study", (req, res) => {
  res.status(200).json({ msg: "success from study endpoint" });
});
app.get("/learn", (req, res) => {
  res.status(200).json({ msg: "success from learn endpoint" });
});

// Make app ready for deployment
if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => console.log("Server is running on port : ", ENV.PORT));
