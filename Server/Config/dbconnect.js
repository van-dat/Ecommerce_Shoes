const mongoose = require("mongoose");
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connect db success");
  } catch (error) {

  }
};
module.exports = { connect };
