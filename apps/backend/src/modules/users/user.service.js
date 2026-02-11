import User from "./user.model.js";


// ===============================
// CREATE USER (Admin only)
// ===============================

export const createUser = async (data) => {

    const existing = await User.findOne({
        email: data.email.toLowerCase()
    });

    if(existing){
        throw new Error("User already exists");
    }

    return User.create({
        ...data,
        email: data.email.toLowerCase()
    });
};



// ===============================
// GET USERS
// ===============================

export const getUsers = async () => {

    return User.find({ isActive: true })
        .select("-password")
        .lean()
        .sort({ createdAt: -1 });
};



// ===============================
// GET EMPLOYEES ONLY
// ===============================

export const getEmployees = async () => {

    return User.find({
        role: "EMPLOYEE",
        isActive: true
    })
    .select("-password")
    .lean();
};



// ===============================
// DEACTIVATE USER (Never hard delete)
// ===============================

export const deactivateUser = async (id) => {

    return User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
};
