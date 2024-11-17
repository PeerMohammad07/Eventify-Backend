import { HttpStatusEnum } from "../enums/statusCodeEnum";
import CustomError from "../infrastructure/utils/customError";
import IEventRepository from "../interfaces/IEventRepository";
import IEventUseCase from "../interfaces/IEventUseCase";
import IUserRepository from "../interfaces/IUserRepository";

export default class EventUseCase implements IEventUseCase {
  private userRepository: IUserRepository;
  private eventRepository: IEventRepository

  constructor(userRepository: IUserRepository, eventRepository: IEventRepository) {
    this.userRepository = userRepository;
    this.eventRepository = eventRepository
  }

  async createEvent(title: string, description: string, date: Date, location: string, userId: string) {
    if (!title || !description || !date || !location || !userId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }

    const response = await this.eventRepository.createEvent(title, description, date, location, userId)
    if (!response) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Failed to create event");
    }

    return {
      status: true,
      message: "User created successfully",
      data: response
    }
  }

  async getAllEvents(userId: string) {
    if (!userId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "UserId is required");
    }
    const response = await this.eventRepository.getAllEvents(userId)
    return {
      status: true,
      message: "Got all events",
      data: response
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
    date: Date,
    location: string,
    eventId: string,
    userId: string) {
    if (!title || !description || !date || !location || !userId || !eventId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }
    const response = await this.eventRepository.editEvent(title,description,date,location,eventId,userId)
    return {
      status: true,
      message: "Event updated successfully",
      data: response
    }
  }
}
