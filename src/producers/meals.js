const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;
const { randomUserId, randomTimestamp, randomMealType, randomCarbs } = require("../utils/faker");

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
const producerMeals = kafka_client.producer();
const topicMeals = "meals_data";

async function produceMealData() {
  try {
    await producerMeals.connect();
    setInterval(async () => {
      const data = {
        userId: randomUserId(),
        timestamp: randomTimestamp(),
        mealType: randomMealType(),
        carbs: randomCarbs(),
      };
      await producerMeals.send({ topic: topicMeals, messages: [{ value: JSON.stringify(data) }] });
      console.log(`[meal] =>`, data);
    }, 4500);
  } catch (error) {
    console.error("Meal Producer error:", error);
  }
}

module.exports = { produceMealData };