const dotenv = require("dotenv");
dotenv.config();

module.exports.kafkaConfig = {
  clientId: process.env.KAFKA_CLIENT_ID || "lifelens-producer",
  brokers: [process.env.BOOTSTRAP_SERVERS || "localhost:9092"],
  ssl: process.env.SECURITY_PROTOCOL === "SASL_SSL" || process.env.SECURITY_PROTOCOL === "SSL",
  sasl: {
    mechanism: process.env.SASL_MECHANISM || "plain",
    username: process.env.KAFKA_API_KEY || "",
    password: process.env.KAFKA_API_SECRET || "",
  },
};