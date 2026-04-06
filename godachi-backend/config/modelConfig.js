const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MAINDB_URL, {
    useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
    console.log("mongoose connection error", err);
});
mongoose.connection.on("connected", (res) => {
    console.log("mongoose connected successfully");
});
