import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"

const inputFilterTemsService = async (data:any) => {
    const filtersRepository = AppDataSource.getRepository(FilterInput)

    const {
        estadoSigla,
        specificProblem,
        frontSpecificProblem,
        manager,
        severity,
    } = data

    const query = `SELECT * FROM filter_input
    WHERE ($1::text IS NULL OR "estadoSigla" = $1::text)
    AND ($2::text IS NULL OR "specificProblem" = $2::text)
    AND ($3::text IS NULL OR "frontSpecificProblem" = $3::text)
    AND ($4::text IS NULL OR "manager" = $4::text)
    AND ($5::integer IS NULL OR "severity" = $5::integer)
    `;

    const totalItems = await filtersRepository.query(query, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,
        manager,
        severity,
    ]);
    
    
    if(totalItems.length > 0) return true
    return false   
}

export default inputFilterTemsService