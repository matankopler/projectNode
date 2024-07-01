import cors from "cors";
import express, { json } from "express";
import morgan from "morgan";
import configDevEnv from "../config";
import connect from "./db/connect/connection";
import usersRouter from "./routes/users";
import { cardRouter } from "./routes/cards";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";

configDevEnv();
connect();
const app = express();

app.use(json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardRouter);

app.use(errorHandler);
app.use(notFound)

app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
    console.log(`App is running in ${process.env.NODE_ENV} mode`);
});