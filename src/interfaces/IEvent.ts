import mongoose from "mongoose";

export default interface IEvent {
  _id? : string
  title: string;
  description: string;
  date: string;
  location: string;
  userId: mongoose.Schema.Types.ObjectId; 
}

export interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}