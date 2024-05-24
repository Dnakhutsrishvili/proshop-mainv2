import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/UserModel.js';

//protect routes

const protect=asyncHandler(async(req,res,next)=>{
    let token;
    //read the JWT from header
    token = req.headers.authorization.split(" ")[1]
    if(token){
        try {
            const decoded=jwt.verify(token,'ss');
          req.user=  await User.findById(decoded.userId).select('-password');
            next()
            
        } catch (error) {
            res.status(401);

            throw new Error('Not authorized ,token failed')
        }

    }else{
        res.status(401);
        throw new Error('Not authorized, no token')
    }

})


//Admin middleWare

const admin=(req,res,next)=>{

    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401);
        throw new Error("not admin")
    }

}

export {admin,protect};