import mongoose, { Model, Schema } from "mongoose";
import { ITicket } from "./ticket.interface";

const TicketSchema: Schema<ITicket> = new Schema<ITicket>({
    busName: { type: String, required: true },
    price: { type: Number, required: true },
    timeSlot: { type: String, required: true },
    date: { type: Date, required: true },
  });
  
  // Ticket Model
  export const Ticket: Model<ITicket> = mongoose.model<ITicket>("Ticket", TicketSchema);