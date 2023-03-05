import { model, Schema } from "mongoose";

const Tiket = Schema({
  turn: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ["attending", "pending", "complete"],
    default: "pending",
  },
  desktop: {
    type: String,
  },
});

const TiketSchema = model("tikets", Tiket);
export default TiketSchema;
