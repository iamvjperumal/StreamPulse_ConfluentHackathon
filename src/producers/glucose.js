const { Kafka } = require("@confluentinc/kafka-javascript").KafkaJS;
const { kafkaConfig } = require("../config");
const {
  randomUserId,
  randomTimestamp,
  randomGlucose,
} = require("../utils/faker");

// const kafka = new KafkaJS({ ...kafkaConfig, clientId: kafkaConfig.clientId });
// const producer = kafka.producer();
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
const topic = "glucose-data";

async function produceGlucoseData() {
  try {
    await producer.connect();
    setInterval(async () => {
      const data = {
        userId: randomUserId(),
        timestamp: randomTimestamp(),
        glucose: randomGlucose(),
      };
      await producer.send({
        topic,
        messages: [{ value: JSON.stringify(data) }],
      });
      console.log(`[glucose] =>`, data);
    }, 3000);
  } catch (error) {
    console.error("Producer error:", error);
  }
}

module.exports = { produceGlucoseData };




// CREATE TABLE glucose_data (
//   userId STRING,
//   `timestamp` TIMESTAMP(3),
//   glucose INT,
//   WATERMARK FOR `timestamp` AS `timestamp` - INTERVAL '5' SECOND
// ) WITH (
//   'connector' = 'kafka',
//   'topic' = 'glucose-data',
//   'properties.bootstrap.servers' = 'localhost:9092',
//   'scan.startup.mode' = 'earliest-offset',
//   'format' = 'json'
// );





// CREATE TABLE meal_data (
//   userId STRING,
//   `timestamp` TIMESTAMP(3),
//   mealType STRING,
//   carbs INT,
//   WATERMARK FOR `timestamp` AS `timestamp` - INTERVAL '5' SECOND
// ) WITH (
//   'connector' = 'kafka',
//   'topic' = 'meals-data',
//   'properties.bootstrap.servers' = 'pkc-921jm.us-east-2.aws.confluent.cloud:9092',
//   'scan.startup.mode' = 'earliest-offset',
//   'format' = 'json'
// );




// CREATE TABLE med_data (
//   userId STRING,
//   `timestamp` TIMESTAMP(3),
//   medType STRING,
//   dosageMg INT,
//   WATERMARK FOR `timestamp` AS `timestamp` - INTERVAL '5' SECOND
// ) WITH (
//   'connector' = 'kafka',
//   'topic' = 'medicine-data',
//   'properties.bootstrap.servers' = 'pkc-921jm.us-east-2.aws.confluent.cloud:9092',
//   'scan.startup.mode' = 'earliest-offset',
//   'format' = 'json'
// );


// CREATE TABLE emotion_data (
//   userId STRING,
//   `timestamp` TIMESTAMP(3),
//   emotion STRING,
//   text STRING,
//   WATERMARK FOR `timestamp` AS `timestamp` - INTERVAL '5' SECOND
// ) WITH (
//   'connector' = 'kafka',
//   'topic' = 'emotion-data',
//   'properties.bootstrap.servers' = 'pkc-921jm.us-east-2.aws.confluent.cloud:9092',
//   'scan.startup.mode' = 'earliest-offset',
//   'format' = 'json'
// );


// CREATE TABLE health_alerts (
//   userId STRING,
//   type STRING,
//   riskLevel STRING,
//   message STRING,
//   `timestamp` TIMESTAMP(3)
// ) WITH (
//   'connector' = 'kafka',
//   'topic' = 'health-alerts',
//   'properties.bootstrap.servers' = 'pkc-921jm.us-east-2.aws.confluent.cloud:9092',
//   'format' = 'json'
// );

