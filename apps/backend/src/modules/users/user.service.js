import User from "./user.model.js";


// CREATE USER (Admin only)

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


// GET USERS
export const getUsers = async () => {

    return User.find({ isActive: true })
        .select("-password")
        .lean()
        .sort({ createdAt: -1 });
};



// GET EMPLOYEES ONLY
export const getEmployees = async () => {

    return User.find({
        role: "EMPLOYEE",
        isActive: true
    })
    .select("-password")
    .lean();
};

// GET USER BY ID
export const getUserById = async (id) => {
    const user = await User.findById(id).select("-password").lean();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};



// DEACTIVATE USER (Never hard delete)

export const deactivateUser = async (id) => {

    return User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );
};

// UPDATE USER
export const updateUser = async (id, data) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    if (data.email) {
        const normalizedEmail = data.email.toLowerCase();
        const existing = await User.findOne({
            email: normalizedEmail,
            _id: { $ne: id }
        });

        if (existing) {
            throw new Error("Email already in use");
        }

        user.email = normalizedEmail;
    }

    if (data.name !== undefined) user.name = data.name;
    if (data.role !== undefined) user.role = data.role;
    if (data.password !== undefined) user.password = data.password;

    await user.save();

    return User.findById(user._id).select("-password").lean();
};
