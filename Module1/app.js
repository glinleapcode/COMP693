import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile("index.html", { root: "public" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
