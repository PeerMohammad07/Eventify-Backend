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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const statusCodeEnum_1 = require("../enums/statusCodeEnum");
const customError_1 = __importDefault(require("../infrastructure/utils/customError"));
class EventUseCase {
    constructor(userRepository, eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }
    createEvent(title, description, date, location, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!title || !description || !date || !location || !userId) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "All fields are required");
            }
            const response = yield this.eventRepository.createEvent(title, description, date, location, userId);
            if (!response) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "Failed to create event");
            }
            return {
                status: true,
                message: "Event created successfully",
                data: response
            };
        });
    }
    getAllEvents(userId, query, filter, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "UserId is required");
            }
            let userObjectId;
            try {
                userObjectId = new mongoose_1.default.Types.ObjectId(userId);
            }
            catch (error) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "Invalid UserId format");
            }
            let findData = { userId: userObjectId };
            if (query && query !== "undefined") {
                findData.title = { $regex: query, $options: 'i' };
            }
            if ((filter === null || filter === void 0 ? void 0 : filter.startDate) || (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
                if (filter.startDate) {
                    findData.date = Object.assign(Object.assign({}, findData.date), { $gte: filter.startDate });
                }
                if (filter.endDate) {
                    findData.date = Object.assign(Object.assign({}, findData.date), { $lte: new Date(filter.endDate) });
                }
            }
            const pageSize = 6;
            const skip = (page - 1) * pageSize;
            const totalEvents = yield this.eventRepository.getCountAllEvents(findData);
            const response = yield this.eventRepository.getAllEvents(findData, skip, pageSize);
            return {
                status: true,
                message: "Got all events",
                data: response,
                totalEvents: totalEvents
            };
        });
    }
    deleteEvent(userId, eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !eventId) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "UserId and eventId is required");
            }
            const response = yield this.eventRepository.deleteEvent(userId, eventId);
            return {
                status: true,
                message: "Event deleted successfully",
                data: response
            };
        });
    }
    editEvent(title, description, date, location, eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!title || !description || !date || !location || !userId || !eventId) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "All fields are required");
            }
            const response = yield this.eventRepository.editEvent(title, description, date, location, eventId, userId);
            return {
                status: true,
                message: "Event updated successfully",
                data: response
            };
        });
    }
}
exports.default = EventUseCase;
