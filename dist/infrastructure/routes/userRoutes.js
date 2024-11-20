"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userUseCase_1 = __importDefault(require("../../useCases/userUseCase"));
const hashingService_1 = __importDefault(require("../utils/hashingService"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const userModel_1 = __importDefault(require("../model/userModel"));
const userRepository_1 = __importDefault(require("../../adapters/respository/userRepository"));
const eventRepository_1 = __importDefault(require("../../adapters/respository/eventRepository"));
const eventUseCase_1 = __importDefault(require("../../useCases/eventUseCase"));
const eventModel_1 = __importDefault(require("../model/eventModel"));
const eventController_1 = __importDefault(require("../../adapters/controllers/eventController"));
const userController_1 = __importDefault(require("../../adapters/controllers/userController"));
// import userAuth from "../middlewares/userAuth"
const userRouter = express_1.default.Router();
const HashingService = new hashingService_1.default();
const JwtService = new jwtService_1.default();
const UserRepository = new userRepository_1.default(userModel_1.default);
const UserUseCase = new userUseCase_1.default(UserRepository, HashingService, JwtService);
const UserController = new userController_1.default(UserUseCase);
const eventRepository = new eventRepository_1.default(eventModel_1.default);
const eventUseCase = new eventUseCase_1.default(UserRepository, eventRepository);
const eventController = new eventController_1.default(eventUseCase);
userRouter.get("/test", (req, res) => {
    res.send({ message: "successfully hosted" });
});
userRouter.post('/event', eventController.createEvent);
userRouter.patch('/event', eventController.editEvent);
userRouter.delete('/event/:userId/:eventId', eventController.deleteEvent);
userRouter.get('/event/:userId/search', eventController.getAllEvents);
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);
exports.default = userRouter;
