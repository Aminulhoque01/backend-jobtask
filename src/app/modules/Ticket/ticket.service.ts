import { ITicket } from "./ticket.interface"
import { Ticket } from "./ticket.model"

export const createTicket = async (ticketData: ITicket): Promise<ITicket> => {
  const ticket = new Ticket(ticketData)
  return await ticket.save()
}

// Get All Tickets
export const getAllTickets = async (): Promise<ITicket[]> => {
  return await Ticket.find()
}

// Update a Ticket
export const updateTicket = async (
  ticketId: string,
  updatedData: Partial<ITicket>,
): Promise<ITicket | null> => {
  return await Ticket.findByIdAndUpdate(ticketId, updatedData, { new: true })
}

// Delete a Ticket
export const deleteTicket = async (
  ticketId: string,
): Promise<ITicket | null> => {
  return await Ticket.findByIdAndDelete(ticketId)
}
