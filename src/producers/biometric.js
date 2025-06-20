const fs = require("fs");
const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;
const {
  randomUserId,
  randomTimestamp,
  randomHeartRate,
  randomSteps,
  randomSleep,
} = require("../utils/faker");
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

const producer = kafka_client.producer();
const topic = "biometric-data";

async function produceBiometricData() {
  await producer.connect();
  setInterval(async () => {
    const data = {
      userId: randomUserId(),
      timestamp: randomTimestamp(),
      heartRate: randomHeartRate(),
      steps: randomSteps(),
      sleepHours: randomSleep(),
    };
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(data) }],
    });
    console.log(`[biometric] =>`, data);
  }, 4000);
}

module.exports = { produceBiometricData };
