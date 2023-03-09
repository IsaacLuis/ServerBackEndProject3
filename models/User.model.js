const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
      type: String,
      required: true,
    },
    name: String,
    profile_image: String,
    age: Number,
    games_pick: [Object],
    review: [{type: Schema.Types.ObjectId, ref: "Review"}],
    profile: [{type: Schema.Types.ObjectId, ref: "Profile"}]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
