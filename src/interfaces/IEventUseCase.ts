import { IReturnMessage } from "./IUserUseCase";
export interface filter {
  startDate : string,
  endDate : string
}

export default interface IEventUseCase {
  createEvent(title:string,description:string,date:string,location:string,userId:string):Promise<IReturnMessage>
  getAllEvents(userId: string,query:string,filter:filter,page:number):Promise<IReturnMessage>
  deleteEvent(userId:string,eventId:string):Promise<IReturnMessage>
  editEvent(title: string,
    description: string,
    date: string,
    location: string,
    eventId: string,
    userId: string):Promise<IReturnMessage>
}