const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const passport = require("passport");
require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes.js");
const pizzaRoutes = require("./routes/pizzaRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const connectDB = require("./config/db");

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({
      origin: process.env.REACT_APP_URL,
      credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp" }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "PizzaDelivery Created By ME | Ilyas Belfar!",
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
// app.use("/test", testRoutes);
app.use("/", authRoutes);
app.use("/pizza", pizzaRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log("Server is running!");
});
