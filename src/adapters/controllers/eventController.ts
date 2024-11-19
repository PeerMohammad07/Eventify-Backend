import { NextFunction, Request, Response } from "express";
import { HttpStatusEnum } from "../../enums/statusCodeEnum";
import IEventUseCase from "../../interfaces/IEventUseCase";


export default class EventController {
  private eventUseCase: IEventUseCase

  constructor(eventUseCase: IEventUseCase) {
    this.eventUseCase = eventUseCase
    this.createEvent = this.createEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.getAllEvents = this.getAllEvents.bind(this)
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, date, location, userId } = req.body      
      const response = await this.eventUseCase.createEvent(title, description, date, location, userId)
      res.status(HttpStatusEnum.OK).json(response);
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const { query, filter, page } = req.query as any;   

      const parsedFilter = filter && filter!="undefined" ? JSON.parse(filter) : {}; 
      
      const response = await this.eventUseCase.getAllEvents(userId,query,parsedFilter,Number(page));
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const eventId = req.params.eventId;
      const response = await this.eventUseCase.deleteEvent(userId, eventId)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, eventId, title, description, date, location } = req.body;      
      const response = await this.eventUseCase.editEvent(title, description, date, location, eventId, userId)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}
