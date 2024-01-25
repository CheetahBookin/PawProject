import express, { Express } from 'express';
import authRouter from './routes/authRoute';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const PORT: number = parseInt(process.env.PORT || '5000');

app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});