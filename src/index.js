const { produceGlucoseData } = require("./producers/glucose");
const { produceEmotionData } = require("./producers/emotion");
const { produceBiometricData } = require("./producers/biometric");


const { produceMedData } = require("./producers/medicine");
const { produceMealData } = require("./producers/meals");

async function start() {
  await produceGlucoseData();
  await produceEmotionData();
  await produceBiometricData();
  await produceMedData();
  await produceMealData();
  // Add calls to other producer functions once converted to use @confluentinc/kafka-javascript
}

start();
