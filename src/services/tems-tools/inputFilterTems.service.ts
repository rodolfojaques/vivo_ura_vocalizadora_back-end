import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"

const inputFilterTemsService = async (data:any) => {
    const filtersRepository = AppDataSource.getRepository(FilterInput)

    const {
        estadoSigla,
        specificProblem,
        frontSpecificProblem,
        manager,
        classificacao,
    } = data    

    const query = `SELECT * FROM filter_input
    WHERE ($1::text IS NOT NULL AND "estadoSigla" = $1::text)
    AND ($2::text IS NULL OR "specificProblem" IS NULL OR "specificProblem" = $2::text)
    AND ($3::text IS NULL OR "frontSpecificProblem" IS NULL OR "frontSpecificProblem" = $3::text)
    AND ($4::text IS NOT NULL AND "manager" = $4::text)
    AND ($5::text IS NOT NULL AND "classificacao" ILIKE '%' || $5::text || '%')
    `;

    const totalItems = await filtersRepository.query(query, [
        estadoSigla,
        specificProblem,
        frontSpecificProblem,
        manager,
        classificacao,
    ]);
    
    
    if(totalItems.length > 0) return true
    return false   
}

export default inputFilterTemsService