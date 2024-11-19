import mongoose from "mongoose";
import { HttpStatusEnum } from "../enums/statusCodeEnum";
import CustomError from "../infrastructure/utils/customError";
import IEventRepository from "../interfaces/IEventRepository";
import IEventUseCase, { filter } from "../interfaces/IEventUseCase";
import IUserRepository from "../interfaces/IUserRepository";

export default class EventUseCase implements IEventUseCase {
  private userRepository: IUserRepository;
  private eventRepository: IEventRepository

  constructor(userRepository: IUserRepository, eventRepository: IEventRepository) {
    this.userRepository = userRepository;
    this.eventRepository = eventRepository
  }

  async createEvent(title: string, description: string, date: string, location: string, userId: string) {
    if (!title || !description || !date || !location || !userId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }

    const response = await this.eventRepository.createEvent(title, description, date, location, userId)
    if (!response) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Failed to create event");
    }

    return {
      status: true,
      message: "Event created successfully",
      data: response
    }
  }

  async getAllEvents(userId: string, query: string, filter: filter, page: number) {
    if (!userId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "UserId is required");
    }

    let userObjectId;
    try {
      userObjectId = new mongoose.Types.ObjectId(userId);  
    } catch (error) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Invalid UserId format");
    }

    let findData: any = { userId: userObjectId };

    if (query && query !== "undefined") {  
      findData.title = { $regex: query, $options: 'i' };  
    }

    if (filter?.startDate || filter?.endDate) {
      if (filter.startDate) {
        findData.date = { ...findData.date, $gte: filter.startDate}; 
      }
      if (filter.endDate) {
        findData.date = { ...findData.date, $lte: new Date(filter.endDate) }; 
      }
    }

    const pageSize = 6; 
    const skip = (page - 1) * pageSize;

    const totalEvents = await this.eventRepository.getCountAllEvents(findData)

    const response = await this.eventRepository.getAllEvents(findData, skip, pageSize);
    return {
      status: true,
      message: "Got all events",
      data: response,
      totalEvents : totalEvents
    }
  }

  async deleteEvent(userId: string, eventId: string) {
    if (!userId || !eventId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "UserId and eventId is required");
    }

    const response = await this.eventRepository.deleteEvent(userId, eventId)
    return {
      status: true,
      message: "Event deleted successfully",
      data: response
    }
  }

  async editEvent(title: string,
    description: string,
    date: string,
    location: string,
    eventId: string,
    userId: string) {
    if (!title || !description || !date || !location || !userId || !eventId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }
    const response = await this.eventRepository.editEvent(title, description, date, location, eventId, userId)
    return {
      status: true,
      message: "Event updated successfully",
      data: response
    }
  }
}
