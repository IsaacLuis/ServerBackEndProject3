const { Schema, model } = require("mongoose");

const gamesSchema = new Schema(
  {
    name: String,
    id: String,
    background_image: String,
    released: Date,
    genres: Array,
    platforms: [Object],
    languages: [String],
    metacritic: Number,
    
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Country = model("Games", gamesSchema);

module.exports = Country;
