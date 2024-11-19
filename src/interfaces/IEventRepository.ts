import IEvent, { DeleteResult } from "./IEvent";

interface IEventRepository {
  createEvent(
    title: string,
    description: string,
    date: string,
    location: string,
    userId: string
  ): Promise<IEvent | null>;
  getCountAllEvents(findData : any):Promise<number>
  getAllEvents(findData: any, skip: number, limit: number) : Promise<IEvent[]>;
  deleteEvent(userId:string,EventId:string):Promise<DeleteResult>
  editEvent(title: string,
    description: string,
    date: string,
    location: string,
    eventId : string,
    userId: string):Promise<IEvent>
}

export default IEventRepository;
