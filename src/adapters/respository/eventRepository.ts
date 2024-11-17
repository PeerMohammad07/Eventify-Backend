import { Model, ObjectId } from "mongoose";
import IEvent from "../../interfaces/IEvent";
import IEventRepository from "../../interfaces/IEventRepository";

class EventRepository implements IEventRepository {
  private event: Model<IEvent>;

  constructor(event: Model<IEvent>) {
    this.event = event;
  }

  async createEvent(
    title: string,
    description: string,
    date: Date,
    location: string,
    userId: string
  ): Promise<IEvent | null> {
    const newEvent = await new this.event({ title, description, date, location, userId });
    return newEvent.save();
  }

  async getAllEvents(userId: string): Promise<IEvent[]> {
    return await this.event.find({ userId }).exec();
  }

  async deleteEvent(userId: string, EventId: string) {
    return await this.event.deleteOne({ userId, _id: EventId })
  }

  async editEvent(title: string,
    description: string,
    date: Date,
    location: string,
    eventId: string,
    userId: string) {
    const updatedEvent = await this.event.findOneAndUpdate(
      { _id: eventId, userId }, 
      { $set: { title, description, date, location } }, 
      { new: true } 
    );
    return updatedEvent as IEvent
  }
}

export default EventRepository;