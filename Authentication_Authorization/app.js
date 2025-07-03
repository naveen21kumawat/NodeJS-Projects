import cookieParser from "cookie-parser";
import express from "express";
import bcrypt from "bcrypt";

const app = express();
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.cookie("name", "naveen");
//   res.send("Cookie has been set!");
// });
// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("password", salt, function (err, hash) {
//       console.log("Hashed Password:", hash);
//       res.send("Hashed Password: " + hash);

//       // Store hash in your password DB.
//     });
//   });
// });

app.get("/", (req, res) => {
   bcrypt.compare("password", "$2b$10$TMtOZUM42ydfNz06SaG.2ebPb3TKHmLVzK8b7TVGFr1QVPo/nB/ee", function(err, result) {
    console.log("Password Match:", result);
    res.send("Password Match: " + result);
   }
)
});

// app.get("/read", (req, res) => {
//   const cookie = req.cookies.name;
//   if (cookie) {
//     return res.send(`Cookie value: ${cookie}`);
//   }
//   res.send("No cookie found!");
// });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
