import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'consumer_SmartOss',
    brokers: ['10.113.144.229:9092','10.113.144.230:9092','10.113.144.237:9092','10.113.144.238:9092'], // DLTems prod
})

const catchAlarmKafka = async () => {
  const consumer = kafka.consumer({ groupId: 'consumer-smartoss' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'events', fromBeginning: false }) // DLTems

  const execute = async (message:any)=>{
    console.log(message.value?.toString())

    return true
  }

  await consumer.run({    
    eachMessage: async ({ topic, partition, message }) => {
      let data = JSON.parse(message.value?.toString()!)

      await execute(message)
    },
  })    
}

export default catchAlarmKafka
