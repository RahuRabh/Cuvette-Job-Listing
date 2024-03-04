require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const job = require("./routes/job");
const errorHandler = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")

const app = express();
app.use(express.json());
app.use(cookieParser)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

app.use("/api/v1/auth", auth);
app.use("/api/v1/job", job)
app.use("/", errorHandler)

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend Server is running at http://${HOST}:${PORT}`);
});
