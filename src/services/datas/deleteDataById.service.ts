import { AppDataSource } from "../../data-source";
import { Datas } from "../../entities/datas.entity";
import { AppError } from "../../error/appError";

const deleteDataByIdService = async (id: number) => {
  const dataRepository = AppDataSource.getRepository(Datas);

  const data = await dataRepository.findOneBy({ id: id });
  if (!data) throw new AppError(400, "Data de plantão não encontrada");

  await dataRepository.delete(id);

  return true;
};

export default deleteDataByIdService;
