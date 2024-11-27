import mongoose, { model, Schema } from "mongoose"
import { IBus, ITicket } from "./bus.interface"

const BusSchema: Schema = new Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  capacity: { type: Number, required: true },
  tickets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }], // Ticket references
})
export const BusDetails = model<IBus>('Bus', BusSchema)

const TicketSchema: Schema = new Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
    price: { type: Number, required: true },
    timeSlot: { type: String, required: true },
  });
  
export const Ticket = model<ITicket>('Ticket', TicketSchema);
 
 


