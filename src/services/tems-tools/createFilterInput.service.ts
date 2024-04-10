import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"

const createFilterInputService = async (data:any) => {
    const filterRepository = AppDataSource.getRepository(FilterInput)
    
    const filter = filterRepository.create(data)
    await filterRepository.save(filter)

    return filter
}

export default createFilterInputService