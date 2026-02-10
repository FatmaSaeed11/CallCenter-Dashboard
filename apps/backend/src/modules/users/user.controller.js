const userService = require("./user.service");


// CREATE
exports.createUser = async (req, res) => {

    try{

        const user = await userService.createUser(req.body);

        res.status(201).json({
            success:true,
            data:user
        });

    }catch(err){

        res.status(400).json({
            success:false,
            message:err.message
        });
    }
};



// GET ALL
exports.getUsers = async (req,res)=>{

    try{

        const users = await userService.getUsers();

        res.json({
            success:true,
            data:users
        });

    }catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};



// GET EMPLOYEES
exports.getEmployees = async (req,res)=>{

    const employees = await userService.getEmployees();

    res.json({
        success:true,
        data:employees
    });
};



// DEACTIVATE
exports.deactivateUser = async (req,res)=>{

    const user = await userService.deactivateUser(req.params.id);

    res.json({
        success:true,
        data:user
    });
};
