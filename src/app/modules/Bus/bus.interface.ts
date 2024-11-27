import mongoose from 'mongoose'

export type IBus = {
  name: string
  route: string
  capacity: number
  tickets: mongoose.Types.ObjectId[] // References to Ticket documents
}


export type ITicket = {
  bus: mongoose.Types.ObjectId
  price: number
  timeSlot: string
}


export type IBusFilters = {
  searchTerm?: string
  name?: string
  capacity?: string
}
export const cowSearchableFields = ['name', 'capacity' ]

export const filterableFields = ['searchTerm', 'name', 'capacity']
