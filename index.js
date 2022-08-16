import express from "express";
import postgresClient from "./config/db.js";
import todoListRouter from './routers/todoList.js';
import cors from 'cors'
const app = express()
app.use(express.json())

//Cors Error.
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
    ],

    allowedHeaders: [
        'Content-Type',
    ],
};
app.use(cors(corsOpts));


app.use('/todolist', todoListRouter);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    postgresClient.connect(err => {
        if (err) {
            console.log("connection error", err)
        } else {
            console.log("db connection succesful");
        }
    })
})