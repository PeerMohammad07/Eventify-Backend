"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodeEnum_1 = require("../../enums/statusCodeEnum");
class EventController {
    constructor(eventUseCase) {
        this.eventUseCase = eventUseCase;
        this.createEvent = this.createEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.getAllEvents = this.getAllEvents.bind(this);
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, date, location, userId } = req.body;
                const response = yield this.eventUseCase.createEvent(title, description, date, location, userId);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const { query, filter, page } = req.query;
                const parsedFilter = filter && filter != "undefined" ? JSON.parse(filter) : {};
                const response = yield this.eventUseCase.getAllEvents(userId, query, parsedFilter, Number(page));
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const eventId = req.params.eventId;
                const response = yield this.eventUseCase.deleteEvent(userId, eventId);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    editEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, eventId, title, description, date, location } = req.body;
                const response = yield this.eventUseCase.editEvent(title, description, date, location, eventId, userId);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = EventController;
