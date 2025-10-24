const amqp = require('amqplib');
const mongoose = require('mongoose');
const Notification = require('./models/Notification');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:admin123@mongodb:27017/notify-blog?authSource=admin';
const QUEUE_NAME = 'notifications';

// Conecta no MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado no consumer!'))
  .catch(err => console.error('Erro MongoDB consumer:', err));

async function startConsumer(retryCount = 0) {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('Aguardando mensagens na fila de notificações...');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log('Nova notificação recebida:', content);

        const notification = new Notification(content);
        await notification.save();

        channel.ack(msg);
      }
    });

  } catch (err) {
    console.error('Erro no consumer:', err.message);

    if (retryCount < 10) {
      console.log('Tentando reconectar em 5s...');
      setTimeout(() => startConsumer(retryCount + 1), 5000);
    } else {
      console.error('Não foi possível conectar ao RabbitMQ após várias tentativas.');
    }
  }
}

startConsumer();
