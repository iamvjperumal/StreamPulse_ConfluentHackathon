const { faker } = require('@faker-js/faker');

module.exports = {
  randomUserId: () => `u${faker.number.int({ min: 100, max: 999 })}`,
  randomTimestamp: () => new Date().toISOString(),
  randomHeartRate: () => faker.number.int({ min: 60, max: 140 }),
  randomSteps: () => faker.number.int({ min: 0, max: 12000 }),
  randomSleep: () => Number(faker.number.float({ min: 3, max: 9, fractionDigits: 1 }).toFixed(1)),
  randomGlucose: () => faker.number.int({ min: 70, max: 250 }),
  randomCarbs: () => faker.number.int({ min: 20, max: 100 }),
  randomMealType: () => faker.helpers.arrayElement(["Breakfast", "Lunch", "Dinner"]),
  randomEmotion: () => faker.helpers.arrayElement(["Happy", "Sad", "Anxious", "Calm"]),
  randomText: () => faker.lorem.sentence(),
  randomMedType: () => faker.helpers.arrayElement(["Insulin", "Metformin", "Sulfonylurea"]),
};