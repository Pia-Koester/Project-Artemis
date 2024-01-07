require("./db.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

//Import Routers
const userRouter = require("./routes/users-route.js");
const activityRouter = require("./routes/activities-route.js");
const membershipPlanRouter = require("./routes/membershipPlans-route.js");
const userMembershipRouter = require("./routes/userMemberships-route.js");
const typeRouter = require("./routes/activityType-route.js");
const errorHandler = require("./middlewares/errorHandler.js");

//MiddleWare
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", userRouter);
app.use("/activities", activityRouter);
app.use("/plan", membershipPlanRouter);
app.use("/memberships", userMembershipRouter);
app.use("/activityTypes", typeRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
