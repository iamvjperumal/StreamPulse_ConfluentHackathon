const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;
const { randomUserId, randomTimestamp, randomMedType } = require("../utils/faker");

const kafka_client = new Kafka({
  kafkaJS: {
    clientId:"ccloud-nodejs-client-6e6713cb-c7be-4add-b996-6885823a8f10",
    brokers: ["pkc-921jm.us-east-2.aws.confluent.cloud:9092"],
    ssl:true,
    sasl: {
      mechanism: "plain",
      username:  "33Y6HZ2UOWJCNHTK",
      password: "jO6wrb1NIQulIvGJEmev2wSJO4U0TkRPhB3hsCRkMXsUxXc4hjhDGRatiQ0NjICb",
    },
  },
});

const producerMeds = kafka_client.producer();
const topicMeds = "medicine-data";

async function produceMedData() {
  try {
    await producerMeds.connect();
    setInterval(async () => {
      const data = {
        userId: randomUserId(),
        timestamp: randomTimestamp(),
        medType: randomMedType(),
        dosageMg: Math.floor(Math.random() * 100) + 10,
      };
      await producerMeds.send({ topic: topicMeds, messages: [{ value: JSON.stringify(data) }] });
      console.log(`[med] =>`, data);
    }, 5000);
  } catch (error) {
    console.error("Med Producer error:", error);
  }
}

module.exports = { produceMedData };