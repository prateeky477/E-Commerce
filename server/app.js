require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const expressAsyncErrors = require("express-async-errors");

const User = require("./models/user");
const product = require("./models/product");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const userInfoRouter = require("./routes/userInfo");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const favRouter = require("./routes/fav");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "https://e-commerce-sandy-chi.vercel.app/",
  credentials: true,
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/userInfo", userInfoRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/fav", favRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to the homepage");
});

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
