require("./db.js");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT;

//Import Routers
const userRouter = require("./routes/users-route.js");
const activityRouter = require("./routes/activities-route.js");
const membershipPlanRouter = require("./routes/membershipPlans-route.js");
const userMembershipRouter = require("./routes/userMemberships-route.js");
const typeRouter = require("./routes/activityType-route.js");
const errorHandler = require("./middlewares/errorHandler.js");
const instructorRouter = require("./routes/instructor-route.js");

//MiddleWare

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "200kb" }));
app.use(bodyParser.urlencoded({ extended: false })); // this is an idea coming from stackoverflow
app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.use("/api", userRouter);
app.use("/api/activities", activityRouter);
app.use("/api/plan", membershipPlanRouter);
app.use("/api/memberships", userMembershipRouter);
app.use("/api/activityTypes", typeRouter);
app.use("/api/instructors", instructorRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
