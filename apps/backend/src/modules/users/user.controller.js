import asyncHandler from "../../common/helpers/asyncHandler.js";
import {
  createUser as createUserService,
  getUsers as getUsersService,
  getEmployees as getEmployeesService,
  getUserById as getUserByIdService,
  updateUser as updateUserService,
  deactivateUser as deactivateUserService
} from "./user.service.js";

// CREATE
export const createUser = asyncHandler(async (req, res) => {
        const user = await createUserService(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
});

// GET ALL
export const getUsers = asyncHandler(async (req, res) => {
        const users = await getUsersService();
        res.json({
            success: true,
            data: users
        });
});

// GET EMPLOYEES
export const getEmployees = asyncHandler(async (req, res) => {
        const employees = await getEmployeesService();
        res.json({
            success: true,
            data: employees
        });
});

// GET BY ID
export const getUserById = asyncHandler(async (req, res) => {
    const user = await getUserByIdService(req.params.id);
    res.json({
        success: true,
        data: user
    });
});

// DEACTIVATE
export const deactivateUser = asyncHandler(async (req, res) => {
    const user = await deactivateUserService(req.params.id);
    res.json({
        success: true,
        data: user
    });
});

// UPDATE
export const updateUser = asyncHandler(async (req, res) => {
    const user = await updateUserService(req.params.id, req.body);
    res.json({
        success: true,
        data: user
    });
});
