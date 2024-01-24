import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'consumer_DL',
    brokers: ['localhost:29092'], // teste local UBUNTU
    // brokers: ['192.168.101.7:9092','192.168.101.8:9092','192.168.102.7:9092','192.168.102.8:9092'], // DLTems
})

const catchAlarmKafka = async () => {
    const consumer = kafka.consumer({ groupId: 'consumer-dlt' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'topico_kafka_teste', fromBeginning: true }) // teste local UBUNTU
    // await consumer.subscribe({ topic: 'events', fromBeginning: true }) // DLTems

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value?.toString(),
        })
      },
    })    
}

export default catchAlarmKafka

