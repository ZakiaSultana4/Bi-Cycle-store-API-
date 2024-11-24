import { IBicycle } from "./product.interface"
import { Bicycle } from "./product.model"


const createBicycleToDb=async (payload:IBicycle):Promise<IBicycle>=>{
const result=await Bicycle.create(payload)
return result
}

const getAllBicycleFromDb=async(query: any)=>{
  if (query) {
    const result = await Bicycle.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { type: { $regex: query, $options: "i" } },
      ],
    });
    return result;
  }


  const result = await Bicycle.find({});

  return result;
}
const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id)
  return result
}

const updateBicycle = async (id: string, data: IBicycle) => {
  const result = await Bicycle.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

const deleteBicycle = async (id: string) => {
  const result = await Bicycle.findByIdAndDelete(id)
  return result
}

export const productService = {
createBicycleToDb,
getAllBicycleFromDb,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle

}