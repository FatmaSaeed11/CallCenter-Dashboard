import User from "./user.model.js";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const hash = await bcrypt.hash(data.password, 10);

  return User.create({
    ...data,
    password: hash
  });
};

export const getAgents = () =>
  User.find({ role: "agent" }).select("-password");
