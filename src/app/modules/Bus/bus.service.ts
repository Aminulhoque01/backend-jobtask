

import { BusDetails } from './bus.model'
import {  IBus} from './bus.interface'

const createBus = async (payload: IBus): Promise<IBus> => {
  const result = await BusDetails.create(payload)
  return result
}

const getAllBus= async(): Promise<IBus[]> =>{
    return await BusDetails.find();
}
  
const getSingleBus = async (id: string): Promise<IBus|null> => {
  const result = await BusDetails.findById(id)
  return result
}

const updateBus = async (
  id: string,
  payload: Partial<IBus>
): Promise<IBus | null> => {
  const result = await BusDetails.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deletedBus = async (id: string): Promise<IBus | null> => {
  const result = await BusDetails.findByIdAndDelete(id)
  return result
}

export const BusCreateService = {
  createBus,
  getAllBus,
  getSingleBus,
   updateBus,
   deletedBus,
}
