import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MQTT_BROKER_URL) {
  throw new Error('❌ MQTT_BROKER_URL not defined in .env');
}

export const mqttConfig = {
  brokerUrl: process.env.MQTT_BROKER_URL,
  username: process.env.MQTT_USERNAME || '',
  password: process.env.MQTT_PASSWORD || '',
};
