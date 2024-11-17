import IEvent, { DeleteResult } from "./IEvent";

interface IEventRepository {
  createEvent(
    title: string,
    description: string,
    date: Date,
    location: string,
    userId: string
  ): Promise<IEvent | null>;

  getAllEvents(userId: string): Promise<IEvent[]>;
  deleteEvent(userId:string,EventId:string):Promise<DeleteResult>
  editEvent(title: string,
    description: string,
    date: Date,
    location: string,
    eventId : string,
    userId: string):Promise<IEvent>
}

export default IEventRepository;
