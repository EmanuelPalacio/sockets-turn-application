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
    enum: ["complete", "pending"],
    default: "pending",
  },
});

const TiketSchema = model("tikets", Tiket);
export default TiketSchema;
