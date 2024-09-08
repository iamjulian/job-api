const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// import routes
const healthRoute = require("./routes/health.route");

const userRoute = require("./routes/user.route");
const startupRoute = require("./routes/startup.route");
const jobRoute = require("./routes/job.route");
const managerRoute = require("./routes/manager.route");
const adminRoute = require("./routes/admin.route");

// routes
app.use("/admin", adminRoute);
app.use("/user", userRoute);
app.use("/startup", startupRoute);
app.use("/jobs", jobRoute);
app.use("/manager", managerRoute);
app.use("/health", healthRoute);

app.use((req, res, next) => { 
       notFound = {
        status:'fail',
        message: 'check your route',
        timestamp: Date.now(),
    };
    try {
        // res.send(notFound);
        res.status(500).send(notFound);
    } catch (error) {
        notFound.message = error;
        res.status(503).send();
    }
})

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

module.exports = app;