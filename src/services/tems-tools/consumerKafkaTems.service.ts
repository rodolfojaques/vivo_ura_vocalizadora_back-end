import { Kafka } from "kafkajs";
import awaitAndPersistenceSevice from "./awaitAndPersistence.service";
import inputFilterTemsService from "./inputFilterTems.service";

const kafka = new Kafka({
    clientId: 'consumer_DL',
    brokers: ['10.113.144.229:9093','10.113.144.230:9093','10.113.144.237:9093','10.113.144.238:9093'], // DLTems prod
})

let count = 0

const catchAlarmKafka = async () => {
  const consumer = kafka.consumer({ groupId: 'consumer-ura' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'events', fromBeginning: false })

  const execute = async (message:any)=>{
    const data = await JSON.parse(message.value?.toString()!)
    const filter = await inputFilterTemsService(data)

    count++
    console.log({
      id: count,
      value: message.value?.toString(),
    })

    if(filter) await awaitAndPersistenceSevice(data)
    

    return true
  }

  await consumer.run({
    
    eachMessage: async ({ topic, partition, message }) => {
      execute(message)
    },
  })    
}

export default catchAlarmKafka
