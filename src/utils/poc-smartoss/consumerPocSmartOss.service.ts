import axios from "axios";
import { Kafka } from "kafkajs";
import { AppDataSource } from "../../data-source";
import { GeradorUniqueCodePocSmartoss } from "../../entities/gerador-unique-code-poc-smartoss.entity";

const kafka = new Kafka({
    clientId: 'consumer_SmartOss',
    brokers: ['10.113.144.229:9093','10.113.144.230:9093','10.113.144.237:9093','10.113.144.238:9093'], // DLTems prod
})

const consumerPocSmartOss = async () => {
  const consumer = kafka.consumer({ groupId: 'consumer-smartoss' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'events', fromBeginning: false }) // DLTems

  const execute = async (message:any)=>{

    const generateCodeRepo = AppDataSource.getRepository(GeradorUniqueCodePocSmartoss)
    const newCode = generateCodeRepo.create({})
    await generateCodeRepo.save(newCode)

    console.log("Message:", message.value?.toString())
    const data = JSON.parse(message.value?.toString()!)

    const dtFormat = new Date(data.alarme.firstSeen)
    const isoFormat = dtFormat.toISOString()
    const dtFormatado = isoFormat.slice(0,10) + " " + isoFormat.slice(11,19)

    const output = {
      contacts: [
        {
          name: 'SmartOss Plantonista',
          code: newCode.id.toString(),
          phones: ["51920000339"],                      
          ALARME: data.persistent.frontSpecificProblem,
          SITE: "0",
          LOCALIDADE: data.persistent.localidadeSigla,
          ESTADO: data.persistent.estadoSigla,
          TA: !!data.persistent.ta? data.persistent.ta.toString() : 'SEMTA',                      
          TIPO_REDE: "0",
          DATA_HORA: dtFormatado,
        },
      ],
    };

    console.log("Output:", output)

    axios.post("http://186.238.82.229/api/mailing/12/contacts?key=kKoD1X4n", output, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    return true
  }

  await consumer.run({    
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value?.toString()!)

      const conditionalCephAlarm1 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_OSD_LATENCY') && data.persistent.frontSpecificProblem.includes('FALHA LATENCIA_ALTA ELEMENTO')
      const conditionalCephAlarm2 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_HEALTH_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
      const conditionalCephAlarm3 = data.manager.includes('SMARTOSS_ATLAS') && data.persistent.id.includes('CEPH_DAEMONS_STATUS') && data.persistent.frontSpecificProblem.includes('FALHA INDISPONIBILIDADE SERVICO')
      
      if(conditionalCephAlarm1 || conditionalCephAlarm2 || conditionalCephAlarm3){
        await execute(message)
      }
    },
  })    
}

export default consumerPocSmartOss
