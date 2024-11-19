import mongoose, { Schema } from "mongoose";
import IEvent from "../../interfaces/IEvent";

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
