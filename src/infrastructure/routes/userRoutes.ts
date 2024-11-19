import express from "express"

import userUseCase from "../../useCases/userUseCase"
import hashingService from "../utils/hashingService"
import jwtService from "../utils/jwtService"
import User from "../model/userModel"
import userRepository from "../../adapters/respository/userRepository"
import EventRepository from "../../adapters/respository/eventRepository"
import EventUseCase from "../../useCases/eventUseCase"
import Event from "../model/eventModel"
import EventController from "../../adapters/controllers/eventController"
import userController from "../../adapters/controllers/userController"
// import userAuth from "../middlewares/userAuth"



const userRouter = express.Router()

const HashingService = new hashingService()
const JwtService = new jwtService()

const UserRepository = new userRepository(User)
const UserUseCase = new userUseCase(UserRepository,HashingService,JwtService)
const UserController = new userController(UserUseCase)


const eventRepository = new EventRepository(Event)
const eventUseCase = new EventUseCase(UserRepository,eventRepository)
const eventController = new EventController(eventUseCase)

userRouter.get("/test",(req,res)=>{
  res.send({message : "successfully hosted"})
})

userRouter.post('/event',eventController.createEvent)
userRouter.patch('/event',eventController.editEvent)
userRouter.delete('/event/:userId/:eventId',eventController.deleteEvent)
userRouter.get('/event/:userId/search',eventController.getAllEvents)

userRouter.post('/register',UserController.register)
userRouter.post('/login',UserController.login)
userRouter.post('/logout',UserController.logout)

export default userRouter