import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { AppDataSourceHistory } from "../../data-source";

const listVocalizacaoHistoryService = async () => {
  const vocalizacaoRepository =
    AppDataSourceHistory.getRepository(VocalizacaoHistory);

  const results = await vocalizacaoRepository.find();
  return results;
};

export default listVocalizacaoHistoryService;
