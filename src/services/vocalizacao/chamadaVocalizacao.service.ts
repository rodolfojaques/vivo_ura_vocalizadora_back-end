import { v4 as uuidv4 } from "uuid";
import { AppDataSourceHistory } from "../../data-source";
import { VocalizacaoHistory } from "../../../src-new/entities/vocalizacao.history.entity";

const chamadaVocalizacaoService = async (data: any) => {
  console.log("Cheguei para vocalizar");
  const vocalizacaoHistoryRepository =
    AppDataSourceHistory.getRepository(VocalizacaoHistory);

  const lastRecord = await vocalizacaoHistoryRepository.find({
    order: { id: "DESC" },
  });
  let code: number = 0;
  lastRecord ? (code = lastRecord[0].id + 1) : (code = 1);

  const newData = vocalizacaoHistoryRepository.create({
    contact_id: data.plantonista.id,
    plantonista: data.plantonista.nome,
    phone: data.plantonista.tel_cel,
    code: code,
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

  const chamadas = async () => {
    axios.post("",output,{
        headers:{
            "Content-Type": "application/json"
        }
    })
    console.log("axios mandou o post");
    console.log();
    const monitorando = output.contacts[0].code;

    setTimeout(() => {
      console.log("acabou o tempo");
      console.log();
      console.log("plantonista não atendeu", " code: ", monitorando);
      console.log();
      console.log("proximo contado");

      setTimeout(() => {
        console.log("acabou o tempo");
        console.log();
        console.log("Gerente1 não atendeu", " code: ", monitorando);
        console.log();
        console.log("proximo contado");

        setTimeout(() => {
          console.log("não atendido");
        }, 30000);
      }, 30000);
    }, 30000);
  };
  chamadas();

  console.log(output);
};

export default chamadaVocalizacaoService;
