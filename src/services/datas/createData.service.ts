import { AppDataSource } from "../../data-source";
import { Datas } from "../../entities/datas.entity";
import { Usuarios } from "../../entities/usuarios.entity";
import { AppError } from "../../error/appError";
import { IDataReq } from "../../interfaces/datas";

const createDataService = async (data: IDataReq, id: number) => {
  const dataRepository = AppDataSource.getRepository(Datas);
  const usuariosRepository = AppDataSource.getRepository(Usuarios);

  const usuario = await usuariosRepository.findOneBy({ id: id });
  if (!usuario) throw new AppError(400, "Usuário não encontrado");

  const dataExist = await dataRepository.findOne({
    relations: { usuario: true },
    where: {
      usuario: { id: usuario.id },
      dia: data.dia,
      turno: data.turno,
    },
  });

  if (!!dataExist) throw new AppError(400, "Não encontrado");

  const newData = dataRepository.create({
    ...data,
    usuario: usuario,
  });
  await dataRepository.save(newData);

  return newData;
};

export default createDataService;
