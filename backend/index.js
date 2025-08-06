import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import router from "./routes/Apis.js";
import cors from "cors"

const app = express();

app.use(express.json());

app.use(cors())

app.use('/',router);

app.get('/', (req, res) => {
    console.log(req.url);
    return res.status(234).send("hello to sever")
});

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log(`connected to the db`);
        app.listen(PORT, () => {
            console.log(`app is listen to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export default app;