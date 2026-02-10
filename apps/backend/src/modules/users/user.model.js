const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // 🔥 never return passwords
    },

    role: {
        type: String,
        enum: ["ADMIN", "EMPLOYEE"],
        default: "EMPLOYEE",
        index: true
    },

    isActive: {
        type: Boolean,
        default: true,
        index: true
    }

}, { timestamps: true });


// 🔥 AUTO HASH PASSWORD
userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});


// 🔥 PASSWORD CHECK
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);
