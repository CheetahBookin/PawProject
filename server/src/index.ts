import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();

const PORT: number = parseInt(process.env.PORT || '5000');

app.get('/', (req, res) => {
    res.send('Witaj');
});

app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});