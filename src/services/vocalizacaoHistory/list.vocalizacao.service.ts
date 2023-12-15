import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { AppDataSourceHistory } from "../../data-source";

const listVocalizacaoHistoryService = async (page:number,size:number) => {
  const limit = size;
  const offset = page === 0 ? 0 : (page - 1) * limit;
  const endIndex = offset + size;

  const vocalizacaoRepository = AppDataSourceHistory.getRepository(VocalizacaoHistory);

  const results = await vocalizacaoRepository.find({
    take: size,
    skip: (page - 1) * size,
    order: {
      id: 'DESC',
    }
});
  const totalItems = await vocalizacaoRepository.count();

  return {
    items: results,
    totalCount: results.length,
    totalPages: Math.ceil(totalItems / size),
    currentPage: page,
    total: totalItems
  }
};

export default listVocalizacaoHistoryService;
