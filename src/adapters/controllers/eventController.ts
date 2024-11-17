import { NextFunction, Request, Response } from "express";
import { HttpStatusEnum } from "../../enums/statusCodeEnum";
import IEventUseCase from "../../interfaces/IEventUseCase";


export default class UserController {
  private eventUseCase: IEventUseCase

  constructor(eventUseCase: IEventUseCase) {
    this.eventUseCase = eventUseCase
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
      const response = await this.eventUseCase.getAllEvents(userId);
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
