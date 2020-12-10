import 'dotenv/config'
import express from 'express';
import rotas from './routes';
import cors from 'cors';
import path from 'path';
const app = express();

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.resolve(__dirname, 'tmp')));

app.use(rotas);

const port = process.env.PORT;
app.listen(port, console.log(`http://localhost:${port}`));