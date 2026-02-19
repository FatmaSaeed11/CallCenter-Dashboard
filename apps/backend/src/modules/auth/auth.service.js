import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { ApiError } from "../../common/errors/ApiError.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "./token.service.js";

export const registerUser = async (data) => {
  const { email, password, name, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({
    email,
    name,
    password,
    role: role || "EMPLOYEE",
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const { password: _password, ...safeUser } = user.toObject();

  return { user: safeUser, accessToken, refreshToken };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const { password: _password, ...safeUser } = user.toObject();

  return { user: safeUser, accessToken, refreshToken };
};
