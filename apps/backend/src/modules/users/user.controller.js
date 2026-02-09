import * as service from "./user.service.js";

export const create = async (req, res) => {
  const user = await service.createUser(req.body);
  res.json(user);
};

export const agents = async (req, res) => {
  const users = await service.getAgents();
  res.json(users);
};
