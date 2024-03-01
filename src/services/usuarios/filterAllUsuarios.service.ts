import { AppDataSource } from "../../data-source";
import { Usuarios } from "../../entities/usuarios.entity";

const filterAllUsuariosService = async (value:string) => {
  const usuariosRepository = AppDataSource.getRepository(Usuarios);
  const usuarios = await usuariosRepository.find();

  if(value === null) return usuarios

  const query = `SELECT * FROM usuarios 
  WHERE ($1::text IS NULL OR "nome" ILIKE '%' || $1::text || '%')
  OR ($1::text IS NULL OR "email" ILIKE '%' || $1::text || '%')
  OR ($1::text IS NULL OR "RE" ILIKE '%' || $1::text || '%')
  OR ($1::text IS NULL OR "typeTeam" ILIKE '%' || $1::text || '%')
  ORDER BY "id"
  `;

  const results = usuariosRepository.query(query,[
    value
  ])

  return results;
};

export default filterAllUsuariosService;
