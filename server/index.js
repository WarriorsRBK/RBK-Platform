const bcrypt = require("bcrypt");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const database = require("../database/index.js");
const bodyParser = require("body-parser");
const path = require("path");
const { Console } = require("console");
const axios = require("axios");

app.use(express.static(__dirname + "/../client/dist"));
app.use(router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = app.listen(PORT, () => {
  console.log("App is listening ON: ", PORT);
});
app.get("/chat", (req, res) => {});
// app.get("/", (req, res) => {});
// app.get("/nav", (req, res) => {});
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
app.post("/EditPins", (req, res) => {
  const User = database.RBK;
  let fullName = req.body.fullName;
  let Pins = req.body.color;
  if (req.body.op === "Plus") {
    if (Pins === "RedPins") {
      User.findOne({ fullName }, (err, docs) => {
        let RedPins = docs.RedPins + 1;
        User.update({ fullName }, { RedPins }, (err) => {
          if (!err) {
            console.log("updated Pin");
          }
        });
      });
    } else if (Pins === "YellowPins") {
      User.findOne({ fullName }, (err, docs) => {
        let YellowPins = docs.YellowPins + 1;
        User.update({ fullName }, { YellowPins }, (err) => {
          if (!err) {
            console.log("updated Pin");
          }
        });
      });
    } else {
      User.findOne({ fullName }, (err, docs) => {
        let BluePins = docs.BluePins + 1;
        User.update({ fullName }, { BluePins }, (err) => {
          if (!err) {
            console.log("updated Pin");
          }
        });
      });
    }
  } else {
    if (Pins === "RedPins") {
      User.findOne({ fullName }, (err, docs) => {
        if (docs.RedPins > 0) {
          let RedPins = docs.RedPins - 1;
          User.update({ fullName }, { RedPins }, (err) => {
            if (!err) {
              console.log("updated Pin");
            }
          });
        }
      });
    } else if (Pins === "YellowPins") {
      User.findOne({ fullName }, (err, docs) => {
        if (docs.YellowPins > 0) {
          let YellowPins = docs.YellowPins - 1;
          User.updateOne({ fullName }, { YellowPins }, (err) => {
            if (!err) {
              console.log("updated Pin");
            }
          });
        }
      });
    } else {
      User.findOne({ fullName }, (err, docs) => {
        if (docs.BluePins > 0) {
          let BluePins = docs.BluePins - 1;
          User.update({ fullName }, { BluePins }, (err) => {
            if (!err) {
              console.log("updated Pin");
            }
          });
        }
      });
    }
  }
});
app.get("/UsersAndPins", (req, res) => {
  let users = [];
  var User = database.RBK;
  User.find({ role: "Student" }, (err, docs) => {
    docs.forEach((element, index) => {
      let cohort = element.cohort;
      let fullName = element.fullName;
      let RedPins = element.RedPins;
      let YellowPins = element.YellowPins;
      let BluePins = element.BluePins;
      users.push({ cohort, fullName, RedPins, YellowPins, BluePins });
    });
  }).then(() => {
    res.send(users);
  });
});
app.post("/UserCreation", async (req, res) => {
  var User = database.RBK;
  password = req.body.password;
  stringPassword = toString(password);
  var hashedPassword = "";
  hashedPassword += await bcrypt.hash(password, 10);
  if (req.body.role === "Student") {
    var obj = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      cohort: req.body.cohort,
      Gender: req.body.Gender,
      RedPins: 0,
      YellowPins: 0,
      BluePins: 0,
    };
  } else if (req.body.role === "ADMIN") {
    var obj = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      Gender: req.body.Gender,
    };
  } else {
    var obj = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      cohort: req.body.cohort,
      Gender: req.body.Gender,
    };
  }
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
app.post("/loggedUsers", (req, res) => {
  let result = [];
  const onlineUsres = database.ONLINEUSERS;
  onlineUsres.find({}, (err, docs) => {
    docs.forEach((element, index) => {
      if (element.role !== "ADMIN") {
        result.push(element.fullName);
      }
    });
    res.send(result);
  });
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
app.post("/CheckUser", (req, res) => {
  const User = database.RBK;
  User.find({ userName: req.body.userName }, async (err, docs) => {
    console.log(req.body);
    console.log("docs", docs);
    if (docs.length > 0) {
      var check = await bcrypt.compare(req.body.password, docs[0].password);
      console.log(check);
      if (check) {
        const onlineUsers = database.ONLINEUSERS;
        let fullName = docs[0].fullName;
        let role = docs[0].role;
        onlineUsers.find({ fullName }, (err, docs) => {
          if (docs.length === 0) {
            onlineUsers.create({ fullName, role });
          }
        });
        res.send([true, docs[0].fullName, docs[0].role]);
      } else {
        res.send([false]);
      }
    } else {
      res.send([false]);
    }
  });
});
app.get("/getAPI", async (req, res) => {
  let data = await axios.get(
    "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b80497e330444f5c936ac85b26bf8827"
  );
  res.send(data.data.articles);
});
app.post("/deleteOnline", (req, res) => {
  const onlineUsers = database.ONLINEUSERS;
  console.log(req.body);
  onlineUsers.deleteOne({ fullName: req.body.fullName }, (err, docs) => {
    if (!err) {
      console.log(docs);
    }
  });
});
app.post("/updateUser", async (req, res) => {
  const User = database.RBK;
  let oldFullName = req.body.fullName;
  let newData = req.body.obj;
  if (newData.password) {
    newData.password = await bcrypt.hash(req.body.obj.password, 10);
  }
  User.updateOne({ fullName: oldFullName }, newData, (err) => {
    if (!err) {
      console.log("updated");
    }
  });
});
app.post("/GetUser", (req, res) => {
  const User = database.RBK;
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
app.post("/DeleteCalendar", (req, res) => {
  const calendar = database.CALENDAR;
  calendar.deleteMany({}, (err, docs) => {
    if (!err) {
      console.log("deleted All");
    }
  });
});
app.post("/calendar", (req, res) => {
  // console.log("req.body", req.body);
  const calendar = database.CALENDAR;
  var value = req.body.value;
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  calendar.create({ value, startTime, endTime }, (err, docs) => {
    if (!err) {
      console.log("data Has Been Created");
    }
  });
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
