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
/**
 * @function getChat - sending json for the chat messages
 */
app.get("/chat", (req, res) => {});

/**
 * @function DeleteCohort - delete one Cohort
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}  - deletes one cohort from the database
 */
app.post("/DeleteCohort", (req, res) => {
  // console.log(req.body);
  const cohort = database.COHORT;
  const cohortNumber = Number(req.body.input);
  cohort.deleteOne({ cohortNumber }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});

/**
 * @function DeleteUser - delete one User
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}  - deletes one user from the database
 */

app.post("/DeleteUser", (req, res) => {
  const User = database.RBK;
  const fullName = req.body.input;
  User.deleteOne({ fullName }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  });
});

/**
 * @function EditPins - edit the number of the pins of a user(adds and remove)
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}  - edits the number of pins of a user and updates the db
 */

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

/**
 * @function Get users and Pins - finds users with a 'student' role   
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}  - deletes one cohort from the database
 */

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

/**
 * @function PostUserCreation - Creates a user (ADMIN/STUDENT/HIR)
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns 
 */

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

/**
 * @function GetChatroomData -  gets chatroom data from database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns chatroom data
 */

app.get("/chatRoomData", (req, res) => {
  const chat = database.CHATROOM;
  chat.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});


/**
 * @function getUserData - gets user data from the database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns UserData
 */

app.get("/UserData", (req, res) => {
  const User = database.RBK;
  User.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

/**
 * @function GetCohortData - gets a cohort from the database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns data(cohort data)  
 */

app.get("/CohortData", (req, res) => {
  const cohort = database.COHORT;
  cohort.find((err, data) => {
    if (err) console.log(err);
    else res.send(data);
  });
});

/**
 * @function PostCohortCreation - creates a cohort in the database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client 
 */

app.post("/CohortCreation", (req, res) => {
  const cohort = database.COHORT;
  cohort.create(req.body);
});

/**
 * @function PostLoggedUsers - finds logged-in users 
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns result array of online users
 */

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


/**
 * @function PostLogged-Out-Users - remove a logged-in user from the database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client 
 */

app.post("/logOutTest", (req, res) => {
  console.log(req.body);
  const onlineUsres = database.ONLINEUSERS;
  const fullName = req.body.input;
  // console.log(fullName);
  onlineUsres.deleteOne({ fullName }, (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  })
})


/**
 * @function Post-CheckUser - check is a user is valid or not
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns Boolean
 */

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

/**
 * @function GetAPI - gets data from the api
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns articles fetched from the api 
 * @async
 */

app.get("/getAPI", async (req, res) => {
  let data = await axios.get(
    "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b80497e330444f5c936ac85b26bf8827"
  );
  res.send(data.data.articles);
});

/**
 * @function DeleteOnline - deletes One online user from online users database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}
 */

app.post("/deleteOnline", (req, res) => {
  const onlineUsers = database.ONLINEUSERS;
  console.log(req.body);
  onlineUsers.deleteOne({ fullName: req.body.fullName }, (err, docs) => {
    if (!err) {
      console.log(docs);
    }
  });
});

/**
 * @function UpdateUser - updates info of a user
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}
 * @async
 */

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

/**
 * @function GetUser - finds a user from the database
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns data of the user
 */

app.post("/GetUser", (req, res) => {
  const User = database.RBK;
  User.find(req.body, (err, docs) => {
    res.send(docs[0]);
  });
});


/**
 * @function DeleteCalendar - Empty the calendar
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}
 */

app.post("/DeleteCalendar", (req, res) => {
  const calendar = database.CALENDAR;
  calendar.deleteMany({}, (err, docs) => {
    if (!err) {
      console.log("deleted All");
    }
  });
});

/**
 * @function PostCalendar - creates data in the calendar
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}
 */

app.post("/calendar", (req, res) => {
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

/**
 * @function GetCalendar - gets all the calendar data
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns all the calendar data from the database
 */

app.get("/calendar", (req, res) => {
  const calendar = database.CALENDAR;
  calendar.find({}).then((todo) => res.send(todo));
});

/**
 * @function delete - deletes one element from the calendar database by id
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 * @returns {void}
 */

app.delete("/:id", (req, res) => {
  const calendar = database.CALENDAR;
  console.log(req.params.id);
  calendar.findByIdAndRemove(req.params.id).then(() => res.end());
});

/**
 * @function Socket.io - handles the socket messaging
 * @param req {object} - the request object coming from the client
 * @param res {object} - the response object that will be sent to the client
 */

const socketio = require("socket.io").listen();
var io = require("socket.io").listen(server);
io.on("connection", function (socket) {
  const chat = database.CHATROOM;
  console.log("User Connected");
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log(msg);
    chat.create(msg);
  });
  socket.on('typing', (data) => {
    console.log('typing data',data)
    socket.broadcast.emit('typing', data)
  })
  socket.on("disconnect", function (msg) {
    console.log("User DisConnected");
  });
});
router.get("/chat", (req, res) => {
  res.send("server is running");
});


