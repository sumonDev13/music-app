import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/db.js';
import cors from 'cors';
import songRouter from './routes/songRouter.js';
import { populateTracks } from './utils/createSongs.js';

dotenv.config();


const app = express();
await dbConnection();
populateTracks();
const port = process.env.PORT || 5000;


//middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/songs',songRouter);

app.listen(port,()=>{
    console.log(`Serving at ${port}`);
});