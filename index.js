require("./db.js");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

//Import Routers
const userRouter = require("./routes/users.js");
const activityRouter = require("./routes/activities.js");
const membershipPlanRouter = require("./routes/membershipPlans.js");

//MiddleWare
app.use(express.json());
app.use(cors());

app.use("/", userRouter)
app.use("/activities", activityRouter)
app.use("/createplan", membershipPlanRouter)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
