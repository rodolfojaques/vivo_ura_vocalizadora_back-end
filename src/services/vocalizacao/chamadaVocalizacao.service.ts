import axios from "axios";
import { AppDataSource, AppDataSourceHistory } from "../../data-source";
import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";
import { ReturnVocalizacao } from "../../entities/returnVocalizacao.entity";

const chamadaVocalizacaoService = async (data: any) => {
  const vocalizacaoHistoryRepository =
    AppDataSourceHistory.getRepository(VocalizacaoHistory);

  const returnVocalizacaoRepository =
    AppDataSource.getRepository(ReturnVocalizacao);
  

  const chamadas = async () => {

  const newData = vocalizacaoHistoryRepository.create({
    contact_id: data.plantonista.id,
    plantonista: data.plantonista.nome,
    phone: data.plantonista.tel_cel,
    alarme: data.alarme,
  });

  await vocalizacaoHistoryRepository.save(newData);

  const output = {
    contacts: [
      {
        name: data.plantonista.nome,
        code: newData.code,
        phones: [data.plantonista.tel_cel],
        CLASSIFICACAO: data.alarme.CLASSIFICACAO,
        TIPO_ALARME: data.alarme.TIPO_ALARME,
        SITE: data.alarme.SITE,
        LOCALIDADE: data.alarme.LOCALIDADE,
        ESTADO: data.alarme.ESTADO,
        TA: data.alarme.TA,
        TIPO_TA: data.alarme.TIPO_TA,
        TIPO_REDE: data.alarme.TIPO_REDE,
        DATA_APRESENTACAO: data.alarme.DATA_APRESENTACAO,
      },
    ],
  };
    console.log(output);

    // axios.post("", output, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const monitorando = output.contacts[0].code;

    setTimeout(async () => {
      const oneReturnVocalizacao = await returnVocalizacaoRepository.findOneBy({
        code: monitorando,
      });
      if (oneReturnVocalizacao) {
        vocalizacaoHistoryRepository.update(oneReturnVocalizacao.id, {
          status: true,
        });

        return
        
      } else {
        setTimeout(async() => {
            

            const newData = vocalizacaoHistoryRepository.create({
            contact_id: data.grupoAtuacao.id,
            plantonista: data.grupoAtuacao.gerente1,
            phone: data.grupoAtuacao.contato_ger1,
            alarme: data.alarme,
            });

            await vocalizacaoHistoryRepository.save(newData);
            const output = {
                contacts: [
                    {
                    name: data.grupoAtuacao.gerente1,
                    code: newData.code,
                    phones: [data.grupoAtuacao.contato_ger1],
                    CLASSIFICACAO: data.alarme.CLASSIFICACAO,
                    TIPO_ALARME: data.alarme.TIPO_ALARME,
                    SITE: data.alarme.SITE,
                    LOCALIDADE: data.alarme.LOCALIDADE,
                    ESTADO: data.alarme.ESTADO,
                    TA: data.alarme.TA,
                    TIPO_TA: data.alarme.TIPO_TA,
                    TIPO_REDE: data.alarme.TIPO_REDE,
                    DATA_APRESENTACAO: data.alarme.DATA_APRESENTACAO,
                    },
                ],
            };
            

            // axios.post("", output, {
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            // });

            const monitorando = output.contacts[0].code;

            const oneReturnVocalizacao =
            await returnVocalizacaoRepository.findOneBy({
                code: monitorando,
            });

            if (oneReturnVocalizacao) {
                vocalizacaoHistoryRepository.update(oneReturnVocalizacao.id, {
                    status: true,
                });

                return
            } else {

            setTimeout(async () => {
                
                
                const newData = vocalizacaoHistoryRepository.create({
                  contact_id: data.grupoAtuacao.id,
                  plantonista: data.grupoAtuacao.gerente2,
                  phone: data.grupoAtuacao.contato_ger2,
                  alarme: data.alarme,
                });
      
                await vocalizacaoHistoryRepository.save(newData);

                const output = {
                  contacts: [
                    {
                      name: data.grupoAtuacao.gerente2,
                      code: newData.code,
                      phones: [data.grupoAtuacao.contato_ger2],
                      CLASSIFICACAO: data.alarme.CLASSIFICACAO,
                      TIPO_ALARME: data.alarme.TIPO_ALARME,
                      SITE: data.alarme.SITE,
                      LOCALIDADE: data.alarme.LOCALIDADE,
                      ESTADO: data.alarme.ESTADO,
                      TA: data.alarme.TA,
                      TIPO_TA: data.alarme.TIPO_TA,
                      TIPO_REDE: data.alarme.TIPO_REDE,
                      DATA_APRESENTACAO: data.alarme.DATA_APRESENTACAO,
                    },
                  ],
                };

                // axios.post("", output, {
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                // });

                const monitorando = output.contacts[0].code;

                const oneReturnVocalizacao =
                  await returnVocalizacaoRepository.findOneBy({
                    code: monitorando,
                  });

                if (oneReturnVocalizacao) {
                  vocalizacaoHistoryRepository.update(oneReturnVocalizacao.id, {
                    status: true,
                  });
                }
                console.log("não atendido");
              }, 30000);
        }
        console.log("acabou o tempo");
        console.log();
        console.log("Gerente1 não atendeu", " code: ", monitorando);
        console.log();
        console.log("proximo contado");
        }, 30000);
      }
      console.log("acabou o tempo");
      console.log();
      console.log("plantonista não atendeu", " code: ", monitorando);
      console.log();
      console.log("proximo contado");
    }, 30000);    
  };
  chamadas();
};

export default chamadaVocalizacaoService;
