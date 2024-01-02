const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const emergencyContactSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String, unique: true },
});

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // TODO - ask Isabella
  password: { type: String, required: true, select: false },
  dateOfRegistration: { type: Date, default: Date.now() },
  lastParticipationDate: { type: Date },
  lastLoginDate: { type: Date },
  profileImage: { type: String },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "admin", "instructor"],
    default: "student",
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  activeMembership: { type: Schema.Types.ObjectId, ref: "Membership" },
  classesRegistered: [{ type: Schema.Types.ObjectId, ref: "Activitie" }],
  dateOfBirth: { type: Date, required: true },
  termsOfUse: { type: Boolean, required: true },
  dataProtectionInfo: { type: Boolean, required: true },
  emergencyContact: emergencyContactSchema,
});

//creating mongoose middleware to hash passwords and make sure mail adress is lowercase
userSchema.pre("save", async function (next) {
  // this pre middlewar applies directly before saving
  if (this.isModified("email")) this.email = this.email.toLowerCase(); // we check if the mail was changed or added and then lowercase it

  if (this.isModified("password"))
    // if a password is new or changed then it gets hashed
    this.password = await bcrypt.hash(this.password, 10);
  console.log("password from middlewar", this.password);
  next();
});

//middleware to lowercase email addresses
userSchema.pre("findOne", function (next) {
  const query = this.getQuery();
  if (query.email) query.email = query.email.toLowerCase();
  next();
});

const User = model("User", userSchema);

module.exports = User;
