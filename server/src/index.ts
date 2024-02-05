import express, { Express } from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute';
import hotelsRouter from './routes/hotelsRoute';
import searchRouter from './routes/searchRoute';
import ratingRouter from './routes/ratingRoute';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

const app: Express = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT: number = parseInt(process.env.PORT || '5000');

app.use("/auth", authRouter)
app.use("/hotels", hotelsRouter)
app.use("/search", searchRouter)
app.use("/rating", ratingRouter)

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});