import { BusDetails } from './bus.model'

export const getAvailableBuses = async () => {
  return await BusDetails.find().populate('tickets').exec()
}

export const getTicketsForBus = async (busId: string) => {
  const bus = await BusDetails.findById(busId).populate('tickets').exec()
  if (!bus) throw new Error('Bus not found')
  return bus.tickets
}
