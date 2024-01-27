import express, { Express } from 'express';
import authRouter from './routes/authRoute';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT: number = parseInt(process.env.PORT || '5000');

app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});