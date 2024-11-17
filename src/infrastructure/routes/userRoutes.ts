import express from "express"

import userUseCase from "../../useCases/userUseCase"
import UserController from "../../adapters/controllers/userController"
import hashingService from "../utils/hashingService"
import jwtService from "../utils/jwtService"
import User from "../model/userModel"
import userRepository from "../../adapters/respository/userRepository"
// import userAuth from "../middlewares/userAuth"



const userRouter = express.Router()

const HashingService = new hashingService()
const JwtService = new jwtService()

const UserRepository = new userRepository(User)
const UserUseCase = new userUseCase(UserRepository,HashingService,JwtService)
const userController = new UserController(UserUseCase)

userRouter.get("/test",(req,res)=>{
  res.send({message : "successfully hosted"})
})

userRouter.post('/register',userController.register)
userRouter.post('/login',userController.login)
userRouter.post('/logout',userController.logout)

export default userRouter