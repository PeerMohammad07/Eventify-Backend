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
class EventRepository {
    constructor(event) {
        this.event = event;
    }
    createEvent(title, description, date, location, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEvent = yield new this.event({ title, description, date, location, userId });
            return newEvent.save();
        });
    }
    getAllEvents(findData, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.event.find(findData)
                    .skip(skip)
                    .limit(limit);
            }
            catch (error) {
                throw new Error("Error fetching events");
            }
        });
    }
    getCountAllEvents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.event.find(query).countDocuments();
        });
    }
    deleteEvent(userId, EventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.event.deleteOne({ userId, _id: EventId });
        });
    }
    editEvent(title, description, date, location, eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedEvent = yield this.event.findOneAndUpdate({ _id: eventId, userId }, { $set: { title, description, date, location } }, { new: true });
            return updatedEvent;
        });
    }
}
exports.default = EventRepository;
