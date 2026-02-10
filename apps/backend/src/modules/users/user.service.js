const User = require("./user.model");


// ===============================
// CREATE USER (Admin only)
// ===============================

exports.createUser = async (data) => {

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

exports.getUsers = async () => {

    return User.find({ isActive: true })
        .select("-password")
        .lean()
        .sort({ createdAt: -1 });
};



// ===============================
// GET EMPLOYEES ONLY
// ===============================

exports.getEmployees = async () => {

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

exports.deactivateUser = async (id) => {

    return User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
};
