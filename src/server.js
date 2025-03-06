const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Session
app.use(
  session({
    store: new pgSession({ conString: process.env.DATABASE_URL }),
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/address", addressRoutes);

app.get("/", (req, res) => res.render("index"));
app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.render("dashboard", { user: req.session.user });
});

// Sync database (Create tables if not exist)
sequelize.sync({ alter: true })  // Ensures tables are created/updated
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("Database sync failed:", err));
