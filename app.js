const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./config/db_conn");

const bodyParser = require("body-parser");
var indexRouter = require("./routes/index");

db.connectToServer(function (err) {
    if (err) {
        console.log(err);
    }
});

const app = express();

app.use(helmet());
app.use(compression());

app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// app.all("*", (req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   next();
// });

//cors
var whitelist = ["http://localhost:4000", "http://localhost:3000"];

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

//cross origin resource sharing
app.use(cors({ origin: corsOptions, credentials: true }));

app.use("/api", indexRouter);

app.get("/", (req, res) => {
    res.send("Server is Running!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
