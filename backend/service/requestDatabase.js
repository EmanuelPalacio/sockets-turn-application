import TiketSchema from "../models/TiketSchema.js";

export const turns = async () => {
  return await TiketSchema.count();
};
export const pendingTikets = async () => {
  return await TiketSchema.find({ state: "pending" }).sort({ turn: 1 });
};
export const pendingCount = async () => {
  return await TiketSchema.find({ state: "pending" }).count();
};
export const turnComplete = async (desktop) => {
  return await TiketSchema.findOneAndUpdate(
    { $and: [{ state: "attending" }, { desktop }] },
    { state: "complete" }
  );
};
