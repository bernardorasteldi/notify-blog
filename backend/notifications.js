const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE_NAME = 'notifications';

async function sendNotification(message) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), { persistent: true });

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);

  } catch (err) {
    console.error('Erro ao enviar notificação para RabbitMQ:', err);
  }
}

module.exports = { sendNotification };
