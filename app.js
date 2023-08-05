import express from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {connectDB} from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
    path: "./data/config.env",
});

const app = express();
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));

// using middleware
app.use(express.json());
app.use(cookieParser());

// using routes
app.use(userRouter);
app.use(taskRouter);
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});


// Error Handling in Nodejs
app.use(errorMiddleware);