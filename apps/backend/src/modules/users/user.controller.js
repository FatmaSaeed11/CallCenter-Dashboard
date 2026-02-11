import * as userService from "./user.service.js";


// CREATE
export const createUser = async (req, res) => {

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
export const getUsers = async (req,res)=>{

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
export const getEmployees = async (req,res)=>{

    const employees = await userService.getEmployees();

    res.json({
        success:true,
        data:employees
    });
};



// DEACTIVATE
export const deactivateUser = async (req,res)=>{

    const user = await userService.deactivateUser(req.params.id);

    res.json({
        success:true,
        data:user
    });
};
