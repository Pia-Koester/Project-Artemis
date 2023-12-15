require("./db.js");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

//Import Routers
const userRouter = require("./routes/users-route.js");
const activityRouter = require("./routes/activities-route.js");
const membershipPlanRouter = require("./routes/membershipPlans-route.js");
const userMembershipRouter = require("./routes/userMemberships-route.js");

//MiddleWare
app.use(express.json());
app.use(cors());

app.use("/", userRouter);
app.use("/activities", activityRouter);
app.use("/plan", membershipPlanRouter);
app.use("/memberships", userMembershipRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
