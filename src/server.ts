import express from "express"
import dotenv from "dotenv"
import userRouter from "./infrastructure/routes/userRoutes";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./infrastructure/config/db";
import errorMiddleware from "./infrastructure/middlewares/errorHandlingMiddleware";
import CustomError from "./infrastructure/utils/customError";

const app = express();

// Config the Dotenv
dotenv.config()

app.use(cookieParser())

// Setting Cors 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// For parsing application/json
app.use(express.json()); 

// Mongodb Connect
connectDB()

app.use("/api/user",userRouter)

// global error handling middlware
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

// Server 
app.listen(PORT,()=>{
  console.log("server is runnning on http://localhost:3000")
})

export default app