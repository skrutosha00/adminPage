import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 5100;

app.listen(port);
console.log("server started " + port);

app.use(express.static(path.resolve("./dist")));

app.get("/dev/dev2/*", (req, res) => {
  res.send("DEV MODE");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});
