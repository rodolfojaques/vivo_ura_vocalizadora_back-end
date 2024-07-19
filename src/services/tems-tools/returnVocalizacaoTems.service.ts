import { AppDataSource } from "../../data-source";
import { ReturnVocalizacaoTems } from "../../entities/returnVocalizacaoTems.entity";

const returnVocalizacaoTemsService = async (data: any) => {
  const repository = AppDataSource.getRepository(ReturnVocalizacaoTems);

  const newData = {
    plantonista: data.contacts[0].name,
    phone: data.contacts[0].phones[0],
    code: data.contacts[0].code,
  };

  const result = repository.create(newData);

  await repository.save(result);

  return result;
};

export default returnVocalizacaoTemsService;
