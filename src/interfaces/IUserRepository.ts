import { UpdateWriteOpResult } from "mongoose";
import IUser from "./IUser";

export default interface IUserRepository {
  checkUserExists(email : string):Promise<IUser|null>
  checkUser(userId:string):Promise<IUser|null>
  createUser(name : string,email:string,password:string):Promise<IUser>
  getAllUser():Promise<IUser[]>

} 