const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const MessageNode = require("./schemas/messageSchema");

const port = 3001;
const app = express();
const router = express.Router();


// Init MongoDB
const dbRoute = "mongodb://localhost:27017/twoliners";
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("MongoDB connection is ON"));
db.on("error", console.error.bind(console, "MongoDB connection Error:"));

// BodyParser logger 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Allowing CORS #Fix-001
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS'); // #Fix-002
  next();
});

// CRUD 

// READ
router.get("/getData", (req, res) => {
  MessageNode.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// UPDATE
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  console.log('>>>>>>>>>>>>', id, update);
  MessageNode.findOneAndUpdate({ _id: id }, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// DELETE
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  MessageNode.findOneAndDelete({ _id: id }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// CREATE
router.post("/putData", (req, res) => {
  let data = new MessageNode();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use("/api", router);

app.listen(port, () => console.log(`LISTENING ON PORT ${port}`));



function test () {
  const id = '5c56b5a893de035fd06a7dd9';
  const update = { message: 'I bet it is great' }
  MessageNode.findOneAndUpdate({ _id: id }, update, err => {
    if (err) return JSON.stringify({ success: false, error: err });
    return JSON.stringify({ success: true });
  });
}

// test();