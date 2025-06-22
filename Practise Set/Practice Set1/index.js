const express = require("express");
const app = express();
const path = require("path");
const fstat = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fstat.readdir(`./files`, (err, files) => {
    res.render("index", { files: files });
  });
});
app.get("/file/:filename", (req, res) => {
  fstat.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("data", { nameOfFile: req.params.filename, filedata: filedata });
    console.log(filedata);
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { nameOfFile: req.params.filename });
});
app.get("/remove/:filename", (req, res) => {
  fstat.unlink(`./files/${req.params.filename}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting file");
    }
    res.redirect("/");
  });
});
app.post("/edit", (req, res) => {
  console.log(req.body);
  fstat.rename(
    `./files/${req.body.prev}`,
    `./files/${req.body.newname}`,
    (err) => {
      if (err) console.log(err.message);

      res.redirect("/");
    }
  );
});

app.post("/create", (req, res) => {
  //  fstat.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.content,(err)=>{
  //   console.log("chal jljd");
  //  })
  //   res.redirect('/');
  console.log("New Data Added");
  fstat.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.content,
    (err) => {}
  );
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
