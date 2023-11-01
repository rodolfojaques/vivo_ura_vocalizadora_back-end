import { AppDataSource } from "../../data-source";
import { ReturnVocalizacao } from "../../entities/returnVocalizacao.entity";

const returnVocalizacaoService = async (data: any) => {
  const repository = AppDataSource.getRepository(ReturnVocalizacao);

  const newData = {
    plantonista: data.contacts[0].plantonista,
    phone: data.contacts[0].phone[0],
    code: data.contacts[0].code,
  };

  const result = repository.create(newData);

  await repository.save(result);

  return result;
};

export default returnVocalizacaoService;
