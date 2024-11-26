import {Request, Response } from "express";
import usersServeice from "./users.serveice";


const createUser = async(req:Request,res:Response)=>{
    try {
        const {user} = req.body;
        const result = await usersServeice.createUser(user);
        res.status(200).json({
            success: true,
            message:'user created successfully',
            data:result,
        });

    } catch (error) {
        res.status(400).json({
            success:false,
            message:'Failed to created user'
        })
    }
}

export default {
    createUser
};