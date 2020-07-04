const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost:27017/RBK", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let usersSchema = new Schema({
  fullName: { type: String, unique: true },
  userName: String,
  email: String,
  password: String,
  role: String,
  cohort: Number,
  Gender: String,
  RedPins: Number,
  YellowPins: Number,
  BluePins: Number,
});

exports.RBK = mongoose.model("RBK", usersSchema);

let chatRoomSchema = new Schema({
  message: String,
  name: String,
  role: String,
  createdAt: String,
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

let onlineUsersSchema = mongoose.Schema({
  fullName: { type: String, unique: true },
  role: String,
});

exports.ONLINEUSERS = mongoose.model("ONLINEUSERS", onlineUsersSchema);
