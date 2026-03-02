import express from 'express';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client.js';
import 'dotenv/config'; 

const app = express();

// 1. Configure the Driver Adapter
const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
});

// 2. Instantiate the Client
const prisma = new PrismaClient({ adapter });

app.use(express.json());

// Example Check: Create a User
app.post('/users', async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({ data: { email, name } });
  res.json(user);
});

app.listen(3000, () => console.log('Server spinning at http://localhost:3000'));