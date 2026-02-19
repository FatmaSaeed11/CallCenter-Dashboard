import asyncHandler from "../common/helpers/asyncHandler.js";
import { ApiError } from "../common/errors/ApiError.js";
import { verifyAccessToken } from "../modules/auth/token.service.js";
import User from "../modules/users/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, token missing");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decoded.id).select("-password").lean();

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = {
    id: user._id,
    role: user.role,
    tenant: user.tenant,
  };

  next();
});

export const roleGuard = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Not authenticated");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role '${req.user.role}' is not allowed to access this resource`
      );
    }

    next();
  };
};

export const adminGuard = roleGuard(["ADMIN"]);
export const employeeGuard = roleGuard(["EMPLOYEE"]);
