const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/RBK", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let usersSchema = new Schema({
  fullName: { type: String, unique: true },
  email: String,
  password: String,
  role: String,
  cohort: Number,
  Gender: String,
});

exports.RBK = mongoose.model("RBK", usersSchema);

let chatRoomSchema = new Schema({
  message: String,
  name: String,
  role: String,
});

exports.CHATROOM = mongoose.model("CHATROOM", chatRoomSchema);

let cohortSchema = new Schema({
  cohortNumber: { type: Number, unique: true },
});

exports.COHORT = mongoose.model("COHORTS", cohortSchema);

let CalendarSchema = new Schema({
  value: String,
});

exports.CALENDAR = mongoose.model("CALENDAR", CalendarSchema);

let pinnedBoard = new Schema({
  fullName: String,
  redPin: Number,
  bluePin: Number,
  yellowPin: Number,
  cohort: String,
});

exports.PINNEDBOARD = mongoose.model("PINNEDBOARD", pinnedBoard);
let onlineUsersSchema = mongoose.Schema({
  fullName: String,
  role: String,
});

exports.ONLINEUSERS = mongoose.model("ONLINEUSERS", onlineUsersSchema);
