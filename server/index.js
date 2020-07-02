require("dotenv/config");
const bcrypt = require("bcrypt");
const express = require("express");
const http = require("http");
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
  const User = database.RBK;
  const fullName = req.body.input;
  User.deleteOne({ fullName }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});

app.post("/UserCreation", async (req, res) => {
  var User = database.RBK;
  password = req.body[0].password;
  console.log(req.body);
  stringPassword = toString(password);
  var hashedPassword = "";
  hashedPassword += await bcrypt.hash(password, 10);
  var obj = {
    fullName: req.body[0].fullName,
    email: req.body[0].email,
    password: hashedPassword,
    role: req.body[0].role,
    cohort: req.body[0].cohort,
    Gender: req.body[0].Gender,
  };
  User.create(obj);
});
app.get("/chatRoomData", (req, res) => {
  const chat = database.CHATROOM;
  chat.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
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
// app.post("/loginTest", (req, res) => {
//   // console.log(req.body.fullName);
//   console.log(req.body);
//   // res.json();
// const onlineUsres = database.ONLINEUSERS;
// onlineUsres.create(req.body);
// });

app.post("/loginTest", async (req, res) => {
  var User = database.RBK;
  console.log(req.body);
  console.log(req.body.fullName);
  console.log(req.body.loginPassword);
  console.log(req.body.hashedPassword);
  if (await bcrypt.compare(req.body.loginPassword, req.body.hashedPassword)) {
    console.log("success");
    const onlineUsres = database.ONLINEUSERS;
    onlineUsres.create(req.body);
  }
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

app.post("/updateUser", (req, res) => {
  const User = database.RBK;
  let oldFullName = req.body.fullName;
  let newData = req.body.obj;
  console.log(oldFullName, newData);
  User.updateOne({ fullName: oldFullName }, newData, (err) => {
    if (!err) {
      console.log("updated");
    }
  });
});
app.post("/GetUser", (req, res) => {
  const User = database.RBK;
  req.body.fullName = req.body.fullName.toLowerCase();
  User.find(req.body, (err, docs) => {
    res.send(docs[0]);
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
  const chat = database.CHATROOM;
  console.log("User Connected");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log(msg);
    chat.create(msg);
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
