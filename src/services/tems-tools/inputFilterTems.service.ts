import { AppDataSource } from "../../data-source"
import { FilterInput } from "../../entities/filterInput.entity"

const inputFilterTemsService = async (data:any) => {
    const filtersRepository = AppDataSource.getRepository(FilterInput)

    const {
        tipoTA,
        estadoSigla,
        tipoPlanta,
        specificProblem,
        familia,
        tipoFalha,
        manager,
        severity,
    } = data

    const query = `SELECT * FROM filter_input
    WHERE ($1::text IS NULL OR "tipoTA" = $1::text)
    AND ($2::text IS NULL OR "estadoSigla" = $2::text)
    AND ($3::text IS NULL OR "tipoPlanta" = $3::text)
    AND ($4::text IS NULL OR "specificProblem" = $4::text)
    AND ($5::text IS NULL OR "familia" = $5::text)
    AND ($6::text IS NULL OR "tipoFalha" = $6::text)
    AND ($7::text IS NULL OR "manager" = $7::text)
    AND ($8::integer IS NULL OR "severity" = $8::integer)
    `;

    const totalItems = await filtersRepository.query(query, [
        tipoTA,
        estadoSigla,
        tipoPlanta,
        specificProblem,
        familia,
        tipoFalha,
        manager,
        severity,
    ]);
    
    
    if(totalItems.length > 0) return true
    return false   
}

export default inputFilterTemsService