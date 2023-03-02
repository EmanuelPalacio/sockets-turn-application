import TiketSchema from "../models/TiketSchema.js";

const createTiketService = async () => {
  const count = await TiketSchema.count();
  const createTiket = await TiketSchema.create({ turn: count + 1 });
  await createTiket.save();
  return createTiket;
};
export default createTiketService;
