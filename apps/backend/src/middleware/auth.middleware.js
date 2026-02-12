import asyncHandler from "../common/helpers/asyncHandler.js";
import { ApiError } from "../common/errors/ApiError.js";
import { verifyAccessToken } from "../modules/auth/token.service.js";
import User from "../modules/users/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ✅ Extract token
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  // ✅ Verify token
  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // ✅ Fetch user
  const user = await User.findById(decoded.id)
    .select("-password")
    .lean(); // 🔥 performance boost

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  // ⭐ VERY IMPORTANT — for multi-tenant later
  req.user = user;
  req.userId = user._id;

  next();
});
