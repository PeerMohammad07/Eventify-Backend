import IEvent from "./IEvent";
import { IReturnMessage } from "./IUserUseCase";

export default interface IEventUseCase {
  createEvent(title:string,description:string,date:Date,location:string,userId:string):Promise<IReturnMessage>
  getAllEvents(userId: string):Promise<IReturnMessage>
  deleteEvent(userId:string,eventId:string):Promise<IReturnMessage>
  editEvent(title: string,
    description: string,
    date: Date,
    location: string,
    eventId: string,
    userId: string):Promise<IReturnMessage>
}