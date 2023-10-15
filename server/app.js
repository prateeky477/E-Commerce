// require("dotenv").config();
// require("express-async-errors");
// const express = require("express");
// var cors = require('cors')
// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173", // <-- location of the react app were connecting to
//     credentials: true,
//   })
// );
// // const ejs = require("ejs");
// const User = require("./models/user");
// const product = require("./models/product");
// const connectDB = require("./db/connect");

// const session = require("express-session"); // auth section
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const { isAuth, isAdmin } = require("./middleware/authMiddleware");
// const notFoundMiddleware = require("./middleware/not-found");

// const loginRouter = require("./routes/login"); // routes section
// const registerRouter = require("./routes/register");
// const userInfoRouter = require("./routes/userInfo");
// const productsRouter = require("./routes/products");
// const cartRouter = require("./routes/cart");

// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// app.use("/login", loginRouter);
// app.use("/register", registerRouter);
// app.use("/userInfo", userInfoRouter);
// app.use("/products", productsRouter);
// app.use("/cart", cartRouter);




// app.get("/", async (req, res) => {
//   // {const find = await User.findOne({_id:req.session.userID});
//   // const find2 = find.username
//   // console.log(find);}

//   res.render("home");
// });







// app.use(notFoundMiddleware); // NOT FOUND MIDDLEWARE

// // db connection
// const port = process.env.PORT || 3000;

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () => console.log(`Server is listening port ${port}...`));
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();





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
const favRouter=require("./routes/fav");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
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

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/userInfo", userInfoRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/fav",favRouter);

app.get("/", async (req, res) => {
  // Replace this with your desired response logic
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
