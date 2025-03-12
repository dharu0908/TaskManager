const express = require("express");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const Task = require("./model/taskmodal");
const User = require("./model/Usermodal");

app.use(express.json()); // For parsing application/json
app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb+srv://dharmikpatel982003:dharmik2003@cluster0.gmaj4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

const secret_key = "this_is_my_key_jay_swaminarayan";

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

app.post("/addtask", async (req, res) => {
  console.log("ahiya to pohchiyu");
  const { title, description, Status, Important } = req.body;
  const task = new Task({ title, description, Status, Important });
  await task.save();
  console.log("here");
  res.send("Task Added");
});
app.get("/gettask", async (req, res) => {
  const task = await Task.find();

  res.json(task);
});
app.get("/getimportant", async (req, res) => {
  const task = await Task.find({
    Important: true,
  });
  res.json(task);
});
app.get("/getcompleted", async (req, res) => {
  const task = await Task.find({
    Status: true,
  });
  res.json(task);
});
app.get("/getincompleted", async (req, res) => {
  const task = await Task.find({
    Status: false,
  });
  res.json(task);
});

app.post("/edittask", async (req, res) => {
  console.log("ahiya to cheiye");
  const { title, description, Status, Important } = req.body;
  const id = req.body._id;
  const task = await Task.findByIdAndUpdate(id, {
    title: title,
    description: description,
    Status: Status,
    Important: Important,
  });
  res.send("Task Updated");
});

app.post("/important", async (req, res) => {
  console.log("ahiya cheiye");
  const { id } = req.body;
  const task = await Task.findByIdAndUpdate(id, { Important: true });
  res.send("Task Marked as Important");
  console.log(`thay gayu mote bhage ${id}`);
});
app.post("/deletetask", async (req, res) => {
  console.log("ahiya to cheiye");

  const id = req.body.id;
  console.log(id);
  const task = await Task.findByIdAndDelete(id);
  res.send("Task Deleted");
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newuser = new User({ email, password });
  await newuser.save();
  console.log(email);
  res.status(200).json("done");
});

app.get("/getuser", async (req, res) => {
  const existinguser = await User.find();
  res.json(existinguser);
});

app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.password === password) {
    res.send("Login Success");
  } else {
    res.send("Invalid Email or Password");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
