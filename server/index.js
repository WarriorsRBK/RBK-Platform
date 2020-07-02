require("dotenv/config");
const express = require("express");
const http = require("http");
// console.log(process.env.ACCESS_TOKEN_SECRET);

const cors = require("cors");

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const database = require("../database/index.js");
const bodyParser = require("body-parser");
app.use(express.static(__dirname + "/../client/dist"));
app.use(router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = app.listen(PORT, () => {
  console.log("App is listening ON: ", PORT);
});
app.get("/chat", (req, res) => {});
app.get("/", (req, res) => {});
app.post("/DeleteCohort", (req, res) => {
  // console.log(req.body);
  const cohort = database.COHORT;
  const cohortNumber = Number(req.body.input);
  cohort.deleteOne({ cohortNumber }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});
app.post("/DeleteUser", (req, res) => {
  // console.log(req.body);
  const User = database.RBK;
  const fullName = req.body.input;
  // console.log(fullName);
  User.deleteOne({ fullName }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});
app.post("/UserCreation", (req, res) => {
  const User = database.RBK;
  User.create(req.body);
});
app.get("/UserData", (req, res) => {
  const User = database.RBK;
  User.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});
app.get("/CohortData", (req, res) => {
  const cohort = database.COHORT;
  cohort.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});
app.post("/CohortCreation", (req, res) => {
  const cohort = database.COHORT;
  cohort.create(req.body);
});
app.post("/loginTest", (req, res) => {
  // console.log(req.body.fullName);
  console.log(req.body);
  // res.json();
  const onlineUsres = database.ONLINEUSERS;
  onlineUsres.create(req.body);
});
app.post("/logOutTest", (req, res) => {
  console.log(req.body);
  const onlineUsres = database.ONLINEUSERS;
  const fullName = req.body.input;
  // console.log(fullName);
  onlineUsres.deleteOne({ fullName }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});
// app.listen(PORT, () => {
//   console.log("App is listening ON: ", PORT);
// });

/**
 *
 * START OF CALENDAR
 */

app.post("/calendar", (req, res) => {
  console.log("req.body", req.body);
  const calendar = database.CALENDAR;
  var value = req.body.value;
  calendar.create({ value });
  // console.log(req.body.todo.value)
});

app.get("/calendar", (req, res) => {
  const calendar = database.CALENDAR;
  calendar.find({}).then((todo) => res.send(todo));
});

// DELETE ITEM FROM CALENDAR
app.delete("/:id", (req, res) => {
  const calendar = database.CALENDAR;
  console.log(req.params.id);
  calendar.findByIdAndRemove(req.params.id).then(() => res.end());
});

/**
 * END OF CALENDAR
 */

/**
 *
 * socket.io for the Chat //test
 *
 */
const socketio = require("socket.io").listen();
// const io = socketio(server);
var io = require("socket.io").listen(server);
io.on("connection", function (socket) {
  console.log("User Connected");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log("Message");
  });
  socket.on("disconnect", function (msg) {
    console.log("User DisConnected");
  });
});
router.get("/chat", (req, res) => {
  res.send("server is running");
});

/**
 *
 */
