import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"

const listFilterInputService = async () => {
    const filterRepository = AppDataSource.getRepository(FilterInput)
    
    const filters = filterRepository.find()

    return filters
}

export default listFilterInputService