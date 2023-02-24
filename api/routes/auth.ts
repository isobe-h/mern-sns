import { Router } from "express";
import { UserModel } from "../models/User";

// register
export const authRouter = Router()
authRouter.post('/login',async(req,res)=>{
  try{
    const user = await UserModel.findOne({email:req.body.email});
    if(!user)return res.status(400).send('User not found')
    if(req.body.password !== user.password)return res.status(500).json('Incorrect Password ')
    return res.status(200).json(user)
  }catch(err){
    console.error(err)
  }
})
authRouter.post("/register", async (req, res) => {
  try {
    const newUser = await new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json(err);
  }
});
