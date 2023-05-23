require("dotenv").config();

const mongoose = require("mongoose");

const connectionStr =
  "mongodb+srv://Ahmedfinal:mongoahmed@cluster0.z4cri4u.mongodb.net/test";

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
