import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __dirname = path.resolve();

// Middlewares
app.use(express.json());

// credentials:true meaning --> server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

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

const startServer = async () => {
  try {
    await connectDB();

    app.listen(3000, () => {
      console.log("Server is running on port : ", ENV.PORT);
    });
  } catch (error) {
    console.error("Error in starting the server", error);
  }
};

startServer();
