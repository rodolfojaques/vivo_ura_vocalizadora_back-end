import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"
import { AppError } from "../../error/appError"

const deleteFilterInputService = async (id:number) => {
    const filterRepository = AppDataSource.getRepository(FilterInput)
    const filter = filterRepository.findOneBy({id:id})

    if(!filter) throw new AppError(404, "Filter not found")

    filterRepository.delete(id)

    return true
}

export default deleteFilterInputService