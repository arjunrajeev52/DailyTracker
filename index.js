const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/routes");




const app = express();
dotenv.config();
// app.set("view engine", "ejs");
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send('Hello to google-sheet API');
});

app.use("/Posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,(req,res)=>console.log(`running on ${PORT}`));