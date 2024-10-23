import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Express = express();
const port: number = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoDBUrl : string = ""

mongoose.connect(mongoDBUrl)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error: mongoose.Error) => {
        console.error("Error connecting to MongoDB", error.message);
    });

app.listen(port, () => {
    console.log(`Server running on port 3000`);
});