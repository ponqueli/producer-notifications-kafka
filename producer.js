import { Kafka } from "kafkajs";
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    brokers: ['wealthy-duck-6474-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'd2VhbHRoeS1kdWNrLTY0NzQkdNUHNZ2s8KFYXSNkTfhDkzqauqdfSBrTJxBirFg',
      password: '',
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Hello World From Producer 2',
          category: 'test',
          recipientId: randomUUID(),
        }),
      },
    ],
  })

  await producer.disconnect();
}

bootstrap().catch(console.error);